export default function WebView({ html, css, js }) {
  const srcDoc = `<html><body>${html}<body/>
  <style>${css}</style>
  <script>${js}</script>
  </html>`;
  return <iframe srcDoc={srcDoc} />;
}
