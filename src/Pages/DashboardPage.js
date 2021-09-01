import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DetailsTable from "../Components/DetailsTable";
import { setUserData } from "../store/slices/authSlice";

const DashboardPage = (props) => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const userdata = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const history = useHistory();

  useEffect(() => {
    let slug;
    if (userdata.role === "admin") {
      slug = "/api/users/all";
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}${slug}`,
          {
            userid: userdata.userid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          localStorage.clear();
          history.push("/error");
        });
    } else {
      slug = `/api/users/${userdata.userid}`;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          localStorage.clear();
          history.push("/error");
        });
    }

    setLoading(true);
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/delete`,
        {
          userid: userdata.userid,
          targetid: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => history.push("/error"));
  };

  if (data) {
    return (
      <div>
        {data.map((i) => (
          <DetailsTable data={i} key={i.email} handleDelete={handleDelete} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>hello from DashboardPage</h1>
    </div>
  );
};

export default DashboardPage;
