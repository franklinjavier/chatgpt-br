export function Analytics() {
  return (
    <>
      <script src="https://www.googletagmanager.com/gtag/js?id=G-8KH9L5MZKT" async></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window?.dataLayer?.push(arguments);}
            gtag('js', new Date()); gtag('config', 'G-8KH9L5MZKT');`,
        }}
      />
    </>
  )
}
