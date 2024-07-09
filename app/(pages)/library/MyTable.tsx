// App.tsx
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TableComponent from '@/app/components/TableComponent';

interface Data {
    name: string;
    title: string;
    area: string;
    developer: string;
    property: string;
}

const data: Data[] = [
    {
        name: 'Property 1',
        title: 'Title 1',
        area: 'Area 1',
        developer: 'Developer 1',
        property: 'Type 1',
    },
    // Add more data here
];

const columns: ColumnDef<Data, any>[] = [
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Title',
        accessorKey: 'title',
    },
    {
        header: 'Area',
        accessorKey: 'area',
    },
    {
        header: 'Developer',
        accessorKey: 'developer',
    },
    {
        header: 'Property',
        accessorKey: 'property',
    },
];

const MyTable: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Real Estate Properties</h1>
            <TableComponent />
        </div>
    );
};

export default MyTable;
