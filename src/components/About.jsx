import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Zoom } from "react-reveal";
import { Row, Container, Card } from "react-bootstrap";

const About = () => {
  // varibale untuk menampung data dari api
  const [data, setData] = useState([]);

  useEffect(() => {
    // get data dari api
    // fetch("https://reqres.in/api/users")
    //   .then((res) => res.json())
    //   .then((data) => setData(data.data));
    getData();
  }, []);

  // axios get data
  const getData = async () => {
    const res = await axios.get("https://reqres.in/api/users");
    console.log(res.data.data);
    setData(res.data.data);
  };

  // const data = [
  //   {
  //     id: 1,
  //     name: "ihsan Miftahul Huda",
  //     email: "isan@gmail.com",
  //     avatar: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 2,
  //     name: "Miftahul",
  //     email: "miftah@gmail.com",
  //     avatar: "https://via.placeholder.com/150",
  //   },
  // ];

  return (
    <section>
      <Container>
        <h1 className="text-center mt-4">Our Team</h1>
        <hr></hr>
        <Row>
          {data.map((item) => {
            return (
              <Zoom key={item.id} right delay={(item.id + 2) * 100}>
                <div className="col-md-4 mb-4 text-center">
                  <Card className="mb-5">
                    <Card.Body>
                      <Card.Img src={item.avatar}></Card.Img>
                      <Card.Title>
                        {item.first_name} {item.last_name}
                      </Card.Title>
                      <Card.Text>{item.email}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Zoom>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default About;
