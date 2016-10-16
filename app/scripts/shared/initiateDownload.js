export default function initiateDownload(csv) {
  const href = encodeURI("data:csv;charset=utf-8," + csv)

  const link = document.createElement("a")
  link.setAttribute("href", href)
  link.setAttribute("download", "ds_export.csv")
  link.click()
}

