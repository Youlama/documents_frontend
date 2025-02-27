import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchDocument, removeSelectedDocument} from "store/slices/documentsSlice.ts";

const DocumentPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {document} = useAppSelector((state) => state.documents)

    useEffect(() => {
        dispatch(fetchDocument(id))
        return () => dispatch(removeSelectedDocument())
    }, []);

    if (!document) {
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
                        src={document.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{document.name}</h1>
                    <p className="fs-5">Описание: {document.description}</p>
                    <p className="fs-5">Срок изготовления: {document.prod_period} дней</p>
                </Col>
            </Row>
        </Container>
    );
};

export default DocumentPage