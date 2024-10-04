import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";

const Saldo = () => {
  const [user, setUser] = useState({
    name: "",
    accountNo: "",
    partnerReferenceNo: "",
  });

  const [accountInfos, setAccountInfos] = useState([]);

  useEffect(() => {
    // informasiSaldo();
  }, []);

  const informasiSaldo = () => {
    const urlAspi =
      "https://apidevportal.aspi-indonesia.or.id:44310/api/v1.0/balance-inquiry";

    const bodyData = {
      partnerReferenceNo: "2020102900000000000001",
      bankCardToken: "6d7963617264746f6b656e",
      accountNo: "2000100101",
      balanceTypes: ["Cash", "Coins"],
      additionalInfo: {
        deviceId: "12345679237",
        channel: "mobilephone",
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "X-TIMESTAMP": "2020-01-01T00:00:00+07:00",
      "X-EXTERNAL-ID": "41807553358950093184162180797837",
      "CHANNEL-ID": "95221",
      "X-PARTNER-ID": "5e349e20641d43db909d6e2019c99311",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZjk3YzdlMi0yN2I2LTQ3MTgtOGU1My05YmI4ZTAwMmZkNTQiLCJjbGllbnRJZCI6IjVlMzQ5ZTIwNjQxZDQzZGI5MDlkNmUyMDE5Yzk5MzExIiwibmJmIjoxNzI4MDI4MjAwLCJleHAiOjE3MjgwMjkxMDAsImlhdCI6MTcyODAyODIwMH0.ysA_Z0mEceeSeLl8_-NulAVFjjEGdDeVCznje05Ljus",
      "X-SIGNATURE":
        "5Ho9PyvtjHnZF2TwH064/l9Z42OZ+AAxObYRTTT4nrZWsVfZF4MTd95ITrHmdt/T9OCEIJL5dqJSpy2R2HWnlw==",
    };

    axios
      .post(urlAspi, bodyData, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.name);
        console.log(res.data.accountNo);
        console.log(res.data.accountInfos);
        console.log(res.data.partnerReferenceNo);

        setUser({
          name: res.data.name,
          accountNo: res.data.accountNo,
          partnerReferenceNo: res.data.partnerReferenceNo,
        });

        setAccountInfos(res.data.accountInfos);
      });
  };

  return (
    <section>
      <Container>
        <h1 className="text-center mt-4">Informasi Saldo</h1>
        <h6 className="text-center">Nama : {user.name}</h6>
        <h6 className="text-center">Account No : {user.accountNo}</h6>
        <h6 className="text-center">
          Partner Reference No : {user.partnerReferenceNo}
        </h6>
        <Button onClick={informasiSaldo}>Check Saldo</Button>
        <hr></hr>
        {accountInfos.map((accountInfo, index) => {
          return (
            <div key={index}>
              <b>Balance Type : {accountInfo.balanceType}</b>
              <br />
              <b>Status : {accountInfo.status}</b>
              <br />
              <b>Reg Status Code : {accountInfo.registrationStatusCode}</b>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Account Infos</th>
                    <th>Value</th>
                    <th>Currency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Amount</td>
                    <td>{accountInfo.amount.value}</td>
                    <td>{accountInfo.amount.currency}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Float Amount</td>
                    <td>{accountInfo.floatAmount.value}</td>
                    <td>{accountInfo.floatAmount.currency}</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Hold Amount</td>
                    <td>{accountInfo.holdAmount.value}</td>
                    <td>{accountInfo.holdAmount.currency}</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Available Balance</td>
                    <td>{accountInfo.availableBalance.value}</td>
                    <td>{accountInfo.availableBalance.currency}</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Ledger Balance</td>
                    <td>{accountInfo.ledgerBalance.value}</td>
                    <td>{accountInfo.ledgerBalance.currency}</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Current Multilateral Limit</td>
                    <td>{accountInfo.currentMultilateralLimit.value}</td>
                    <td>{accountInfo.currentMultilateralLimit.currency}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
        })}
      </Container>
    </section>
  );
};

export default Saldo;
