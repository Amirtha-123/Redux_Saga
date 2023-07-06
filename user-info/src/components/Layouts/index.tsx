import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../utils/constants/router.constants";

const Layouts = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const isCreatePage = location.pathname.includes("/create");
  return (
    <>
      <nav>
        <div style={{ textAlign: "right" }}>
          {isCreatePage ? (
            <p>User Form</p>
          ) : (
            <Link to={ROUTERS.create} onClick={() => navigate(ROUTERS.create)}>
              <h3>Create</h3>
            </Link>
          )}
        </div>
        <div style={{ textAlign: "left" }}>
          <h3>
            <Link to={ROUTERS.home}>Home</Link>
          </h3>
        </div>
      </nav>

      <div style={{ marginBottom: "50px" }}>{children}</div>

      <footer
        style={{
          textAlign: "center",
        }}
      >
        <em></em> Copyright@Tartlabs
      </footer>
    </>
  );
};
export default Layouts;
