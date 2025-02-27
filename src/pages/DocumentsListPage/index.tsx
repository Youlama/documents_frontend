import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Document} from "src/modules/types.ts";
import DocumentCard from "components/DocumentCard";
import {DocumentMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";
import "./styles.css"

type Props = {
    documents: T_Document[],
    setDocuments: React.Dispatch<React.SetStateAction<T_Document[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    documentName: string,
    setDocumentName: React.Dispatch<React.SetStateAction<string>>
}

const DocumentsListPage = ({documents, setDocuments, isMock, setIsMock, documentName, setDocumentName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/documents/?document_name=${documentName.toLowerCase()}`)
            const data = await response.json()
            setDocuments(data.documents)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setDocuments(DocumentMocks.filter(document => document.name.toLowerCase().includes(documentName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={documentName} onChange={(e) => setDocumentName(e.target.value)} placeholder="Поиск..."></Input>
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
                    <Col key={document.id} xs="4">
                        <DocumentCard document={document} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DocumentsListPage