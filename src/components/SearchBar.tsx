import { Input } from 'antd';

const { Search } = Input;

type SearchBarProps = {
  onSearch: (value: string) => void;
  query?: string;
};

const SearchBar = ({ onSearch, query }: SearchBarProps) => {
  return (
    <Search
      placeholder="Search for ingredient"
      onSearch={onSearch}
      enterButton
      defaultValue={query}
    />
  );
};

export default SearchBar;
