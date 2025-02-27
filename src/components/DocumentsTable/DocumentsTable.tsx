import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Document} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteDocument} from "store/slices/documentsSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    documents:T_Document[]
}

const DocumentsTable = ({documents}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (document_id) => {
        navigate(`/documents/${document_id}`)
    }

    const openDocumentEditPage = (document_id) => {
        navigate(`/documents/${document_id}/edit`)
    }

    const handleDeleteDocument = async (document_id) => {
        dispatch(deleteDocument(document_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({ cell }) => <img src={`${import.meta.env.VITE_API1_URL}/api/documents/${cell.row?.original.id}/image`} width={100} />
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Срок изготовления',
                accessor: 'prod_period',
                Cell: ({ value }) => value
            },
            {
                Header: 'Срок замены',
                accessor: 'replace_period',
                Cell: ({ value }) => value
            },
            {
                Header: 'Длинна номера',
                accessor: 'number_length',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openDocumentEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteDocument(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!documents.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={documents} onClick={handleClick} />
    )
};

export default DocumentsTable