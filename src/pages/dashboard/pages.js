import Admin from '@/layouts/Admin'
import { getPages, updatePage } from '@/services/pages'
import { useEffect, useState } from 'react'
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import dynamic from 'next/dynamic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
export const getServerSideProps = async () => {
  const pages = await getPages()
  return {
    props: {
      pagesData: pages,
    },
  }
}

const Pages = ({ pagesData }) => {
  const [pages, setPages] = useState(pagesData)
  const [selectedPage, setSelectedPage] = useState(pages[0])
  const [isSuccess, setIsSuccess] = useState(null)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  async function onUpdatePage() {
    setIsSuccess(null)
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const response = await updatePage(selectedPage.id, html)
    if (response.success) {
      setIsSuccess(true)
      setSelectedPage({ ...selectedPage, content: html })
      setPages(
        pages.map((page) => {
          if (page.id === selectedPage.id) {
            return { ...page, content: html }
          }
          return page
        })
      )
    } else {
      setIsSuccess(false)
    }
  }

  useEffect(() => {
    const blocks = convertFromHTML(selectedPage.content)
    const state = ContentState.createFromBlockArray(
      blocks.contentBlocks,
      blocks.entityMap
    )
    setEditorState(EditorState.createWithContent(state))
  }, [selectedPage])
  function selectPage(id) {
    setSelectedPage(pages.find((page) => page.id === id))
  }
  return (
    <div className="flex flex-col relative bg-blueGray-200 text-blueGray-900 p-4 rounded-lg w-full">
      <div className="w-full">
        <select
          className="select select-bordered w-full"
          onChange={(e) => selectPage(e.target.value)}
          value={selectedPage.id}
        >
          {pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 bg-white rounded-lg prose w-full max-w-full">
        {window && (
          <Editor
            editorState={editorState}
            editorStyle={{
              width: '100%',
              height: '100%',
              overflow: 'auto',
              padding: '1rem',
            }}
            onEditorStateChange={setEditorState}
          />
        )}
      </div>
      {isSuccess !== null && (
        <div
          className={`alert mt-4 ${
            isSuccess ? 'alert-success' : 'alert-error'
          }`}
        >
          <div className="flex-1">
            <label>{isSuccess ? 'Page updated' : 'Error'}</label>
          </div>
        </div>
      )}
      <div className="mt-2">
        <button className="btn btn-primary" onClick={onUpdatePage}>
          Update
        </button>
      </div>
    </div>
  )
}

export default Pages

Pages.layout = Admin
