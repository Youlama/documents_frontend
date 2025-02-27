import {useAppSelector} from "store/store.ts";
import {Card, Col, Row} from "reactstrap";
import RequestCard from "components/RequestCard/RequestCard.tsx";
import {T_Request} from "modules/types.ts";
import "./RequestTable.css"

type Props = {
    requests:T_Request[]
}

const RequestsTable = ({requests}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    return (
        <div className="mb-5">
            <div className="mb-2" style={{fontWeight: "bold"}}>
                <Card style={{padding: "10px"}}>
                    <Row>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={1}>
                            Статус
                        </Col>
                        <Col>
                            Дата создания
                        </Col>
                        <Col>
                            Дата формирования
                        </Col>
                        <Col>
                            Дата завершения
                        </Col>
                        <Col>
                            QR
                        </Col>
                        {!is_superuser &&
                            <Col>
                                Действие
                            </Col>
                        }
                        {is_superuser &&
                            <>
                                <Col>
                                    Пользователь
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                            </>
                        }
                    </Row>
                </Card>
            </div>
            <div className="d-flex flex-column gap-2">
                {requests.map((request, index) => (
                    <RequestCard request={request} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
};

export default RequestsTable