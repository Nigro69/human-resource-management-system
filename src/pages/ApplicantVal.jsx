import React, { useState } from "react";
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useStateContext } from "../context/ContextProvider";
import { Router, useNavigate } from "react-router-dom";

function ApplicantVal() {
  const [showOtp, setShowOtp] = useState(false);
const { setEmail } = useStateContext();

const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      mobile: "",
      email: "",
      otp: "",
    },
  });

  async function handleGenerateOTP() {
    fetch(`http://44.204.133.124/api/v1/auth/generateOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log("Success:", body);
        alert("OTP sent to your email");
        setShowOtp(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function handleVerifyOTP() {
    fetch(`http://44.204.133.124/api/v1/auth/verifyOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.values.email,
        otp: form.values.otp,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log("Success:", body);
        setEmail(form.values.email);
        // localStorage.setItem("accessTokenFawr", body.data.access_Token)
        // localStorage.setItem("refreshTokenFawr", body.data.refresh_Token)
        if (!body.error) navigate(`/applicant/${body.data._id}`);
      });
  }

  return (
    <div className="">
      <Box sx={{ maxWidth: 400 }} mx="auto">
        <form
          onSubmit={form.onSubmit(() => {
            if (!showOtp) handleGenerateOTP();
            else handleVerifyOTP();
          })}
        >
          <TextInput
            label="Enter your Mobile Number"
            withAsterisk
            placeholder="Mobile Number"
            {...form.getInputProps("mobile")}
          />
          <TextInput
            label="Enter your email id"
            withAsterisk
            placeholder="@gmail.com"
            mt="md"
            {...form.getInputProps("email")}
          />
          {showOtp && (
            <TextInput
              label="Enter OTP"
              withAsterisk
              placeholder="OTP"
              mt="md"
              {...form.getInputProps("otp")}
            />
          )}

          <Button className="!bg-blue-500" type="submit" mt="md">
            {!showOtp ? "Generate OTP" : "Next"}
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default ApplicantVal;
