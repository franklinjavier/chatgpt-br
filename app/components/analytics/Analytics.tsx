export function Analytics() {
  return (
    <>
      <script src="https://www.googletagmanager.com/gtag/js?id=G-Q6TC4N8JKC" async></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window?.dataLayer?.push(arguments);}
            gtag('js', new Date()); gtag('config', 'G-Q6TC4N8JKC');`,
        }}
      />
    </>
  )
}
