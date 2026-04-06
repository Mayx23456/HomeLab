export type SectionConfig = {
  id: string
  title: string
  description: string
}

export const sectionConfigs: SectionConfig[] = [
  {
    id: 'hero',
    title: 'Hero',
    description: 'Use this section for your headline, positioning statement, and call to action.',
  },
  {
    id: 'about',
    title: 'About',
    description: 'Introduce the person, team, or product and explain what makes it different.',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Highlight featured case studies, launches, or product features.',
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Add social links, email details, or a contact form integration.',
  },
]
