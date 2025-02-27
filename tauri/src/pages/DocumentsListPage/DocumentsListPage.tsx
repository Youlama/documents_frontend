import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import DocumentCard from "components/DocumentCard/DocumentCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateDocumentName} from "src/store/slices/documentsSlice.ts";
import {T_Document} from "modules/types.ts";
import {DocumentMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"
import {isTauri} from "@tauri-apps/api/core";

type Props = {
    documents: T_Document[],
    setDocuments: React.Dispatch<React.SetStateAction<T_Document[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const DocumentsListPage = ({documents, setDocuments, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {document_name} = useAppSelector((state:RootState) => state.documents)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDocumentName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setDocuments(DocumentMocks.filter(document => document.name.toLowerCase().includes(document_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchDocuments()
    }

    const fetchDocuments = async () => {
        try {
            const env = await import.meta.env;
            const apiUrl = isTauri() ? env.VITE_API_URL : ""
            const response = await fetch(`${apiUrl}/api/documents/?document_name=${document_name.toLowerCase()}`)
            const data = await response.json()
            setDocuments(data)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchDocuments()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={document_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {documents?.map(document => (
                    <Col key={document.id} sm="12" md="6" lg="4">
                        <DocumentCard document={document} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DocumentsListPage