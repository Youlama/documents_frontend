import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {E_RequestStatus, T_Document} from "modules/types.ts";
import {
    fetchCart,
    removeDocumentFromDraftRequest,
    updateDocumentValue
} from "store/slices/requestsSlice.ts";
import {useEffect, useState} from "react";
import {addDocumentToRequest} from "store/slices/documentsSlice.ts";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";

type Props = {
    document: T_Document,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean
}

const DocumentCard = ({document, showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm, request} = useAppSelector(state => state.requests)

    const [local_comment, setLocal_comment] = useState(document.comment)

    const location = useLocation()

    const isRequestPage = location.pathname.includes("requests")

    const handeAddToDraftRequest = async () => {
        await dispatch(addDocumentToRequest(document.id))
        dispatch(fetchCart())
    }

    const handleRemoveFromDraftRequest = async () => {
        await dispatch(removeDocumentFromDraftRequest(document.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateDocumentValue({
            document_id: document.id,
            comment: local_comment
        }))
    }

    if (isRequestPage) {
        const isCompleted = request.status == E_RequestStatus.Completed

        return (
            <Card key={document.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={`${import.meta.env.VITE_API1_URL}/api/documents/${document.id}/image`}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {document.name}
                            </CardTitle>
                            <CardText>
                                Срок изготовления: {document.prod_period} дней
                            </CardText>
                            {isCompleted && <CustomInput label="Новый номер документа" value={document.new_document_number} disabled={true} className={"w-25"}/> }
                            <CustomTextarea label="Комментарий" type="text" value={local_comment} setValue={setLocal_comment} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/documents/${document.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftRequest}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={document.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={`${import.meta.env.VITE_API1_URL}/api/documents/${document.id}/image`}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {document.name}
                </CardTitle>
                <CardText>
                    Срок изготовления: {document.prod_period} дней
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/documents/${document.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {!is_superuser && showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftRequest}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default DocumentCard