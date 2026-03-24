export type PageMeta = {
  title: string
  description?: string
}

export function setPageMeta({ title, description }: PageMeta) {
  document.title = title

  if (description === undefined) return

  let el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', 'description')
    document.head.appendChild(el)
  }
  el.setAttribute('content', description)
}
