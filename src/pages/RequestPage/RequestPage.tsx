import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftRequest,
    fetchRequest,
    removeRequest, sendDraftRequest,
    triggerUpdateMM,
    updateRequest
} from "store/slices/requestsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_RequestStatus, T_Document} from "modules/types.ts";
import DocumentCard from "components/DocumentCard/DocumentCard.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const RequestPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated} = useAppSelector((state) => state.user)

    const request = useAppSelector((state) => state.requests.request)

    const [reason, setReason] = useState<string>(request?.reason)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchRequest(id))
        return () => dispatch(removeRequest())
    }, []);

    useEffect(() => {
        setReason(request?.reason)
    }, [request]);

    const sendRequest = async (e) => {
        e.preventDefault()

        await saveRequest()

        await dispatch(sendDraftRequest())

        navigate("/requests/")
    }

    const saveRequest = async (e?) => {
        e?.preventDefault()

        const data = {
            reason
        }

        await dispatch(updateRequest(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteRequest = async () => {
        await dispatch(deleteDraftRequest())
        navigate("/documents/")
    }

    if (!request) {
        return (
            <div>

            </div>
        )
    }

    const isDraft = request.status == E_RequestStatus.Draft

    return (
        <Form onSubmit={sendRequest} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновая заявка" : `Заявка №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomTextarea label="Причина замены" placeholder="Введите причину замены" value={reason} setValue={setReason} disabled={!isDraft}/>
            </Row>
            <Row>
                {request.documents.length > 0 ? request.documents.map((document:T_Document) => (
                    <Row key={document.id} className="d-flex justify-content-center mb-5">
                        <DocumentCard document={document} showRemoveBtn={isDraft} editMM={isDraft} />
                    </Row>
                )) :
                    <h3 className="text-center">Документы не добавлены</h3>
                }
            </Row>
            {isDraft &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveRequest}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteRequest}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default RequestPage