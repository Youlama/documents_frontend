import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchDocuments, updateDocumentName} from "store/slices/documentsSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import DocumentsTable from "components/DocumentsTable/DocumentsTable.tsx";

const DocumentsTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {documents, document_name} = useAppSelector((state) => state.documents)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDocumentName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchDocuments())
    }

    useEffect(() => {
        dispatch(fetchDocuments())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

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
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/documents/add">
                        <Button color="primary">Создать документ</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {documents.length > 0 ? <DocumentsTable documents={documents} fetchDocuments={fetchDocuments}/> : <h3 className="text-center mt-5">Документы не найдены</h3>}
            </Row>
        </Container>
    );
};

export default DocumentsTablePage