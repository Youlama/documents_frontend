import {Button, Card, Col, Row, Tooltip} from "reactstrap";
import {E_RequestStatus, T_Request} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptRequest, fetchRequests, rejectRequest} from "store/slices/requestsSlice.ts";
import {useState} from "react";

type Props = {
    request: T_Request
    index: number
}

const RequestCard = ({request, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptRequest = async (request_id) => {
        await dispatch(acceptRequest(request_id))
        await dispatch(fetchRequests())
    }

    const handleRejectRequest = async (request_id) => {
        await dispatch(rejectRequest(request_id))
        await dispatch(fetchRequests())
    }

    const navigate = useNavigate()

    const openRequestPage = () => {
        navigate(`/requests/${request.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const [qrTooltipOpen, setQrTooltipOpen] = useState(false)

    const toogleQrTooltip = () => setQrTooltipOpen(!qrTooltipOpen)

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[request.status]}
                </Col>
                <Col>
                    {formatDate(request.date_created)}
                </Col>
                <Col>
                    {formatDate(request.date_formation)}
                </Col>
                <Col>
                    {formatDate(request.date_complete)}
                </Col>
                <Col>
                    {request.status == E_RequestStatus.Completed &&
                        <>
                            <Button color="primary" id={"QrTooltip-" + request.id}
                                    onMouseEnter={toogleQrTooltip} onMouseLeave={toogleQrTooltip}>Показать</Button>
                            <Tooltip
                                placement="left"
                                isOpen={qrTooltipOpen}
                                target={"QrTooltip-" + request.id}
                                style={{maxWidth: "100%"}}
                            >
                                <img src={`data:image/png;base64,${request.qr}`} alt="" width={250}/>
                            </Tooltip>
                        </>
                    }
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openRequestPage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {request.owner}
                        </Col>
                        <Col>
                            {request.status == E_RequestStatus.InWork && <Button color="primary" onClick={() => handleAcceptRequest(request.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {request.status == E_RequestStatus.InWork && <Button color="danger" onClick={() => handleRejectRequest(request.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default RequestCard