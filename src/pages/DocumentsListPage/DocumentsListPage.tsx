import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchDocuments, updateDocumentName} from "store/slices/documentsSlice.ts";
import DocumentCard from "components/DocumentCard/DocumentCard.tsx";
import Bin from "components/Bin/Bin.tsx";
import {fetchCart} from "store/slices/requestsSlice.ts";

const DocumentsListPage = () => {

    const dispatch = useAppDispatch()

    const {documents, document_name} = useAppSelector((state) => state.documents)

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {draft_request_id, documents_count} = useAppSelector((state) => state.requests)

    const hasDraft = draft_request_id != null

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDocumentName(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchDocuments())
    }

    useEffect(() => {
        dispatch(fetchDocuments())
        if (is_authenticated && !is_superuser) {
            dispatch(fetchCart())
        }
    }, [])

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
                {is_authenticated && !is_superuser &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_request_id={draft_request_id} documents_count={documents_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {documents?.map(document => (
                    <Col key={document.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <DocumentCard document={document} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DocumentsListPage