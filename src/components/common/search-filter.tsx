import React from 'react';
import MultipleSelectChip from './multiple-select.tsx';
import { Tag } from '../../models/index.ts';
import { tagList } from '../../api/tags.ts';
export default function SearchFilterHandler({setFilter, onSubmit}) {

    const [name, setName] = React.useState("")
    const [tagsDict, setTagsDict] = React.useState<{[name: string] : Tag}>({})
    const [selectedTags, setSelectedTags] = React.useState<Tag[]>([])

    const fetchTags = async () => {
        const res = await tagList(); // res is an array
        try {
            const tmp = {}
            res.forEach(tag => {
                tmp[tag.name] = tag
            });
            setTagsDict(tmp)
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmitHandler = async () => {
        setFilter({
            "tags": selectedTags,
            "name": name
        })
        console.log("SET FILTER")
        onSubmit();
    }
    React.useEffect(() => {
            fetchTags()
    }, [])
    return (
        <div className='flex flex-row content-center px-3 '>
            <button className='bg-white rounded-xl aspect-square text-4xl hover:rotate-6 duration-100' onClick={onSubmitHandler}>⌕</button>
            <input id="title" onChange={(e) => setName(e.target.value)} className='block p-2.5 w-1/2 mx-5 text-sm text-gray-700 bg-gray-50 rounded-lg border' placeholder='Search by name'/>
            <MultipleSelectChip tags={Object.keys(tagsDict)} selectedTag={selectedTags} setSelectedTag={setSelectedTags}/>
        </div>

    )
}