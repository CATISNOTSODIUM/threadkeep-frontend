import React from "react";
import MultipleSelectChip from "./multiple-select.tsx";
import { tagList } from "../../api/tags.ts";
import { InputGroup, Input, InputLeftAddon} from "@chakra-ui/react"
import ThreadCreateCard from "../thread/thread-create-card.tsx";


interface TagDictType {
  label: string;
  value: string;
}
export default function SearchFilterHandler({ setFilter }) {
  const [name, setName] = React.useState("");
  const [tagsDict, setTagsDict] = React.useState<TagDictType[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const fetchTags = async () => {
    const tagsRequest = await tagList(); // res is an array
    if (tagsRequest.error) {
      return;
    }
    try {
      const tmp: TagDictType[] = [];
      
      tagsRequest.data.forEach((tag) => {
        tmp.push({
          label: tag.name, value: tag.name
        })
        tmp[tag.name] = tag;
      });
      setTagsDict(tmp);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitHandler = async () => {
    setFilter({
      tags: selectedTags.map((tag) => tagsDict[tag].id),
      name: name,
    });
  };

  React.useEffect(() => {
    onSubmitHandler();
  }, [selectedTags, name]);  // eslint-disable-line react-hooks/exhaustive-deps
  
  React.useEffect(() => {
    fetchTags();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="flex gap-2 flex-col md:flex-row content-center my-2">
      <ThreadCreateCard/>
      <InputGroup className="max-w-96">
        <InputLeftAddon>Title</InputLeftAddon>
        <Input placeholder='Your title' value={name} onChange={(e) => setName(e.target.value)}/>
      </InputGroup>
      <div className="max-w-96">
        <MultipleSelectChip 
          tagOptions={tagsDict}
          setSelectedTags={setSelectedTags}
        />
      </div>
      
    </div>
  );
}
/*


*/