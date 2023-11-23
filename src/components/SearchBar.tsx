import { Input } from 'antd';

const { Search } = Input;

type SearchBarProps = {
  onSearch: (value: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return <Search placeholder="Search for ingredient" onSearch={onSearch} enterButton />;
};

export default SearchBar;
