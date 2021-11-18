import Admin from '@/layouts/Admin'
import { getPages } from '@/services/pages'
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
      pages,
    },
  }
}

const Pages = ({ pages }) => {
  const [selectedPage, setSelectedPage] = useState(pages[0])
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  useEffect(() => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log(html)
  }, [editorState])

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
    <div className="flex flex-wrap">
      <div className="relative bg-blueGray-100 text-blueGray-900 p-4 rounded-lg w-full">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => selectPage(e.target.value)}
          value={selectedPage.id}
        >
          {pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.title}
            </option>
          ))}
        </select>
        <div className="mt-4">
          {window && (
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setEditorState}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Pages

Pages.layout = Admin
