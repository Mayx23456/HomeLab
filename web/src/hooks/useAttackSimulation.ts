import { startTransition, useEffect, useRef, useState } from 'react'
import { topologyEdgeIds, topologyNodeIds } from '../data/topology'

export type AttackScenarioId = 'recon' | 'exploit' | 'detect'

export type AttackPulseStream = {
  edgeId: string
  color: string
  count: number
  staggerMs: number
  travelMs: number
  direction?: 'forward' | 'reverse'
}

export type AttackScenario = {
  id: AttackScenarioId
  buttonLabel: string
  phaseLabel: string
  bannerLabel: string
  activeNodeIds: string[]
  highlightedEdgeIds: string[]
  pulseStreams: AttackPulseStream[]
  firewallFlash?: boolean
  splunkRapidPulse?: boolean
  showAlertBadge?: boolean
}

const scenarioDurationMs = 4_000
const scenarioTickMs = 50

export const attackScenarios: AttackScenario[] = [
  {
    id: 'recon',
    buttonLabel: 'Recon',
    phaseLabel: 'Reconnaissance',
    bannerLabel: 'PHASE 1 - RECONNAISSANCE',
    activeNodeIds: [topologyNodeIds.kali],
    highlightedEdgeIds: [topologyEdgeIds.firewallToLanZone, topologyEdgeIds.lanZoneToKali],
    pulseStreams: [
      {
        edgeId: topologyEdgeIds.lanZoneToKali,
        color: '#f59e0b',
        count: 1,
        staggerMs: 0,
        travelMs: 1_200,
        direction: 'reverse',
      },
      {
        edgeId: topologyEdgeIds.firewallToLanZone,
        color: '#f59e0b',
        count: 1,
        staggerMs: 0,
        travelMs: 1_200,
        direction: 'reverse',
      },
    ],
  },
  {
    id: 'exploit',
    buttonLabel: 'Exploit',
    phaseLabel: 'Exploitation',
    bannerLabel: 'PHASE 2 - EXPLOITATION',
    activeNodeIds: [topologyNodeIds.kali, topologyNodeIds.metasploitable],
    highlightedEdgeIds: [topologyEdgeIds.kaliToMetasploitable],
    pulseStreams: [
      {
        edgeId: topologyEdgeIds.kaliToMetasploitable,
        color: '#ff3c3c',
        count: 3,
        staggerMs: 300,
        travelMs: 1_350,
      },
    ],
    firewallFlash: true,
  },
  {
    id: 'detect',
    buttonLabel: 'Detect',
    phaseLabel: 'Detection & Response',
    bannerLabel: 'PHASE 3 - DETECTION & RESPONSE',
    activeNodeIds: [topologyNodeIds.splunk],
    highlightedEdgeIds: [topologyEdgeIds.firewallToSplunk, topologyEdgeIds.metasploitableToSplunk],
    pulseStreams: [
      {
        edgeId: topologyEdgeIds.firewallToSplunk,
        color: '#00c8ff',
        count: 1,
        staggerMs: 0,
        travelMs: 1_500,
      },
      {
        edgeId: topologyEdgeIds.metasploitableToSplunk,
        color: '#00c8ff',
        count: 1,
        staggerMs: 0,
        travelMs: 1_350,
      },
    ],
    splunkRapidPulse: true,
    showAlertBadge: true,
  },
]

type UseAttackSimulationResult = {
  currentScenario: AttackScenario
  currentScenarioIndex: number
  scenarios: AttackScenario[]
  elapsedMs: number
  progress: number
  isPaused: boolean
  runKey: number
  jumpToScenario: (scenarioId: AttackScenarioId) => void
  togglePaused: () => void
}

export function useAttackSimulation(): UseAttackSimulationResult {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [runKey, setRunKey] = useState(0)

  const scenarioIndexRef = useRef(0)
  const elapsedRef = useRef(0)

  useEffect(() => {
    scenarioIndexRef.current = currentScenarioIndex
  }, [currentScenarioIndex])

  useEffect(() => {
    elapsedRef.current = elapsedMs
  }, [elapsedMs])

  useEffect(() => {
    if (isPaused) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      const nextElapsed = elapsedRef.current + scenarioTickMs

      if (nextElapsed >= scenarioDurationMs) {
        const nextIndex = (scenarioIndexRef.current + 1) % attackScenarios.length
        scenarioIndexRef.current = nextIndex
        elapsedRef.current = 0

        startTransition(() => {
          setCurrentScenarioIndex(nextIndex)
          setElapsedMs(0)
          setRunKey((current) => current + 1)
        })
        return
      }

      elapsedRef.current = nextElapsed
      setElapsedMs(nextElapsed)
    }, scenarioTickMs)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  const jumpToScenario = (scenarioId: AttackScenarioId) => {
    const nextIndex = attackScenarios.findIndex((scenario) => scenario.id === scenarioId)

    if (nextIndex === -1) {
      return
    }

    scenarioIndexRef.current = nextIndex
    elapsedRef.current = 0

    startTransition(() => {
      setCurrentScenarioIndex(nextIndex)
      setElapsedMs(0)
      setRunKey((current) => current + 1)
    })
  }

  const togglePaused = () => {
    setIsPaused((current) => !current)
  }

  return {
    currentScenario: attackScenarios[currentScenarioIndex],
    currentScenarioIndex,
    scenarios: attackScenarios,
    elapsedMs,
    progress: 1 - elapsedMs / scenarioDurationMs,
    isPaused,
    runKey,
    jumpToScenario,
    togglePaused,
  }
}
