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
  const [isLoading, setIsLoading] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  async function onUpdatePage() {
    setIsLoading(true)
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const response = await updatePage(selectedPage.id, html)
    if (response.success) {
      alert('Page updated successfully')
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
      alert('Error updating page')
    }
    setIsLoading(false)
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
    <>
      <div className="w-full">
        <select
          className="w-full select select-bordered"
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
      <div className="w-full max-w-full mt-4 prose bg-white rounded-lg">
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
      <div className="mt-2">
        <button
          className={`btn btn-primary ${isLoading && 'disabled'}`}
          onClick={onUpdatePage}
          disabled={isLoading}
        >
          Update
        </button>
      </div>
    </>
  )
}

export default Pages

Pages.layout = Admin
