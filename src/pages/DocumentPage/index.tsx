import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Document} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {DocumentMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type Props = {
    selectedDocument: T_Document | null,
    setSelectedDocument: React.Dispatch<React.SetStateAction<T_Document | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const DocumentPage = ({selectedDocument, setSelectedDocument, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/documents/${id}`)
            const data = await response.json()
            setSelectedDocument(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedDocument(DocumentMocks.find(document => document?.id == parseInt(id as string)) as T_Document)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedDocument(null)
    }, []);

    if (!selectedDocument) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedDocument.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedDocument.name}</h1>
                    <p className="fs-5">Описание: {selectedDocument.description}</p>
                    <p className="fs-5">Срок изготовления: {selectedDocument.prod_period} дней</p>
                    <p className="fs-5">Срок замены: {selectedDocument.replace_period ? `${selectedDocument.replace_period} дней` : "Неограничен"}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default DocumentPage