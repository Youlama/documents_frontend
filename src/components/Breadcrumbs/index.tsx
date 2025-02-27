import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Document} from "modules/types.ts";
import "./styles.css"

interface Props {
    selectedDocument: T_Document | null
}

const Breadcrumbs = ({ selectedDocument }: Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/documents") &&
                <BreadcrumbItem active>
                    <Link to="/documents">
						Документы
                    </Link>
                </BreadcrumbItem>
			}
            {selectedDocument &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedDocument.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs