import { Button, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import { Typography } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const { Title } = Typography;

interface IRegister {
  company: string;
  conditions: boolean;
  confirmation: string;
  email: string;
  names: string;
  password: string;
  phone: string;
  surnames: string;
}

export const RegisterForm = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const [form] = Form.useForm<IRegister>();
  const { t } = useTranslation();

  const conditionsValue = Form.useWatch("conditions", form);

  const [hideBtn, setHideBtn] = useState<boolean>(conditionsValue);

  const onChange = (e: CheckboxChangeEvent) => {
    setHideBtn(e.target.checked);
  };

  const onFinish = ({
    company,
    conditions,
    confirmation,
    email,
    names,
    password,
    phone,
    surnames,
  }: IRegister) => {
    console.log("Success:", {
      company,
      conditions,
      confirmation,
      email,
      names,
      password,
      phone,
      surnames,
    });

    if (password !== confirmation) {
      Modal.error({
        title: t("Invalid data!"),
        content: [
          <>
            <span>{`Password and password confirmation do not match.`} </span>
            <br />
            <br />
            <span>{`Please input them again`}</span>
          </>,
        ],
        autoFocusButton: null,
        okText: "agreed",
      });

      return;
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ width: "100%" }}>
      <Col style={{ width: "100%" }}>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Title level={3} style={{ margin: "50px 0px" }}>
            {t("Create your account")}
          </Title>
        </Row>
        <Row
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Form
            name="register"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              width: "100%",
            }}
            initialValues={{
              conditions: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Form.Item
                label={t("Names")}
                name="names"
                rules={[
                  {
                    required: true,
                    message: `${t("Please input your names")}`,
                  },
                ]}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 15px)",
                  marginBottom: "6px",
                }}
              >
                <Input placeholder={`${t("Names").toLowerCase()}`} />
              </Form.Item>

              <Form.Item
                label={t("Surnames")}
                name="surnames"
                rules={[
                  {
                    required: true,
                    message: `${t("Please input your surnames")}`,
                  },
                ]}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 15px)",
                  marginBottom: "6px",
                }}
              >
                <Input placeholder={`${t("Surnames").toLowerCase()}`} />
              </Form.Item>
            </Form.Item>

            {role === "provider" && (
              <Form.Item
                label={t("Company Name")}
                name="company"
                rules={[
                  {
                    required: false,
                    message: `${t("Please input your company name")}`,
                  },
                ]}
                style={{
                  width: "100%",
                  marginBottom: "6px",
                }}
              >
                <Input placeholder={`${t("Company Name").toLowerCase()}`} />
              </Form.Item>
            )}

            <Form.Item
              label={t("Email")}
              name="email"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your email")}`,
                },
                {
                  type: "email",
                  message: `${t("Please input a valid email")}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder="email@smtp.com" />
            </Form.Item>

            <Form.Item
              label={t("Phone number")}
              name="phone"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your phone number")}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder={`${t("Phone number").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              label={t("Password")}
              name="password"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your password")}`,
                },
                {
                  min: 6,
                  message: `${t(
                    "Sorry, your password must be at least 6 characters"
                  )}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input.Password placeholder={`${t("Password").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              label={t("Confirm password")}
              name="confirmation"
              rules={[
                {
                  required: true,
                  message: `${t("Please confirm your password")}`,
                },
                {
                  min: 6,
                  message: `${t(
                    "Sorry, your password must be at least 6 characters"
                  )}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input.Password placeholder={`${t("Password").toLowerCase()}`} />
            </Form.Item>

            <Form.Item name="conditions" valuePropName="checked">
              <Checkbox checked={hideBtn} onChange={onChange}>
                {t("I accept terms and conditions")}
              </Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 12,
              }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="primary" htmlType="submit" disabled={!hideBtn}>
                {t("Get Into")}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};
