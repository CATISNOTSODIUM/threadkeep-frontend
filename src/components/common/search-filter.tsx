import React from 'react';
import MultipleSelectChip from './multiple-select.tsx';
import { Tag } from '../../models/index.ts';
import { tagList } from '../../api/tags.ts';
export default function SearchFilterHandler({setFilter}) {

    const [name, setName] = React.useState("")
    const [tagsDict, setTagsDict] = React.useState<{[name: string] : Tag}>({})
    const [selectedTags, setSelectedTags] = React.useState<string[]>([])

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
            "tags": selectedTags.map(tag => tagsDict[tag].id),
            "name": name
        })
    }
    React.useEffect(() => {
            onSubmitHandler()
    }, [selectedTags, name])
    React.useEffect(() => {
            fetchTags()
    }, [])
    return (
        <div className='flex flex-row content-center px-3 '>
            <input id="title" onChange={(e) => setName(e.target.value)} className='block p-2.5 w-3/4 lg:w-1/2 mx-5 text-sm text-gray-700 bg-gray-50 rounded-lg border' placeholder='Search by name'/>
            <MultipleSelectChip tags={Object.keys(tagsDict)} selectedTag={selectedTags} setSelectedTag={setSelectedTags}/>
        </div>

    )
}