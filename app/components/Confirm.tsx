import Modal from "@/app/components/modals/Modal";
import React, { FC, useState } from "react";
import useConfirm from "../hooks/useConfirm";
import { Spinner } from "flowbite-react";

interface Props {
    onDelete: () => void;
    isLoading: boolean;
}

const Confirm: FC<Props> = ({ onDelete, isLoading }) => {
    const newConfirm = useConfirm();

    const body = (
        <div className=" font-medium text-base text-center">
            Item you have selected will be moved to trash, Are you sure?{" "}
        </div>
    );

    return (
        <Modal
            confirm
            title={"Do you want to delete the selected item ?"}
            disabled={isLoading}
            isOpen={newConfirm.isOpen}
            actionLabel={isLoading ? 
                <div className="flex justify-center items-center gap-2">
                <Spinner
                    aria-label="Spinner button"
                    size="md"
                   className=" text-white fill-rose-500"
                />
                <span className="">Deleting</span>
            </div>
                : "Delete"}
            secondaryActionLabel="Cancel"
            onClose={newConfirm.onClose}
            onSubmit={onDelete}
            body={body}
        />
    );
};

export default Confirm;
