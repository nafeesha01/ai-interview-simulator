import * as pdfjsLib from "pdfjs-dist"

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export async function extractResumeText(file) {

  const fileReader = new FileReader()

  return new Promise((resolve, reject) => {

    fileReader.onload = async function () {

      try {

        const typedArray =
          new Uint8Array(
            fileReader.result
          )

        const pdf =
          await pdfjsLib.getDocument(
            typedArray
          ).promise

        let text = ""

        for (
          let pageNum = 1;
          pageNum <= pdf.numPages;
          pageNum++
        ) {

          const page =
            await pdf.getPage(pageNum)

          const content =
            await page.getTextContent()

          const pageText =
            content.items
              .map(item => item.str)
              .join(" ")

          text += pageText + " "
        }

        resolve(text)

      }

      catch(error){

        reject(error)

      }

    }

    fileReader.readAsArrayBuffer(file)

  })

}