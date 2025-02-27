import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_request_id: string,
    documents_count: number
}

const Bin = ({isActive, draft_request_id, documents_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return (
        <Link to={`/requests/${draft_request_id}/`} className="bin-wrapper">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {documents_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin