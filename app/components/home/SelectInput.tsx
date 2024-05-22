import Select from "react-select";

export type SelectValue = {
    value: string;
};

interface SelectInputProps {
    value?: SelectValue;
    onChange: (value: SelectValue) => void;
    options: any[];
    placeholder: string;
    isSearchable?: boolean
}

export const SelectInput: React.FC<SelectInputProps> = ({
    value,
    onChange,
    options,
    placeholder, 
    isSearchable
}) => {
    return (
        <div className=" w-full">
            <Select
                isClearable
                isSearchable ={isSearchable}
                value={value}
                options={options}
                onChange={(value) => onChange(value)}
                placeholder={placeholder}
                formatOptionLabel={({title , name} : any) => <div>{title? title : name}</div>}
                classNames={{
                    control: () => 'p-1 border-1',
                    input: () => 'text-base',
                    option: () => 'text-base'
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                      ...theme.colors,
                      primary: 'black',
                      primary25: '#e2e8f0'
                    }
                  })}
            />
        </div>
    );
};
