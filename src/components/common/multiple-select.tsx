import * as React from "react";
import { Select } from "chakra-react-select";
import { FormControl } from "@chakra-ui/react";

interface TagDictType {
  label: string;
  value: string;
}

export default function MultipleSelectChip({
  tagOptions,
  setSelectedTags,
}: {
  tagOptions: TagDictType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleTagChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedTags(selectedValues);
  };
  return (
    <FormControl>
      <Select
        isMulti
        tagColorScheme="teal"
        options={tagOptions}
        onChange={handleTagChange}
        placeholder="Select tags"
      />
    </FormControl>
  );
}