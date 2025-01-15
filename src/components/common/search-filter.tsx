import React from "react";
import MultipleSelectChip from "./multiple-select.tsx";
import { Tag } from "../../models/index.ts";
import { tagList } from "../../api/tags.ts";
import { InputGroup, Input, InputLeftAddon, HStack } from "@chakra-ui/react"


export default function SearchFilterHandler({ setFilter }) {
  const [name, setName] = React.useState("");
  const [tagsDict, setTagsDict] = React.useState<{ [name: string]: Tag }>({});
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const fetchTags = async () => {
    const tagsRequest = await tagList(); // res is an array
    if (tagsRequest.error) {
      return;
    }
    try {
      const tmp = {};
      tagsRequest.data.forEach((tag) => {
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
  }, [selectedTags, name]);
  React.useEffect(() => {
    fetchTags();
  }, []);
  return (
    <HStack>
      <InputGroup className="py-2 max-w-96">
        <InputLeftAddon>Title</InputLeftAddon>
        <Input placeholder='Your title' />
      </InputGroup>
      <MultipleSelectChip/>
    </HStack>
  );
}

/*

<div className="flex flex-row content-center px-3 mb-5 ">
      <input
        id="title"
        onChange={(e) => setName(e.target.value)}
        className="block p-2.5 w-3/4 lg:w-1/2 mx-5 text-sm text-gray-700 bg-gray-50 rounded-lg border"
        placeholder="Search by name"
      />
      <MultipleSelectChip
        tags={Object.keys(tagsDict)}
        selectedTag={selectedTags}
        setSelectedTag={setSelectedTags}
      />
    </div>
  */