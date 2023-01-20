import { Button, Modal, Form, Input, Select, InputNumber } from "antd";
import React, { useState } from "react";
import "twin.macro";

const { TextArea } = Input
const { Option } = Select;
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]
const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
export const generateLines = (startMonth, startYear, count) => {
    let monthIndex = startMonth - 1
    let year = startYear
    const result = []
    for (let i = 0; i < count; i++) {
        result.push(`Payment for ${months[monthIndex]} ${year}`)
        if (monthIndex === months.length - 1) {
            monthIndex = 0
            year++;
        } else {
            monthIndex++;
        }
    }
    return result
}
const FormMultiplePayment = ({ linesProps }) => {
    const [lines, setLines] = linesProps
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const hideModal = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        const { noOfLines, startMonth, startYear, lineDesc, rate, qty } = values
        if (noOfLines > 0) {
            const names = generateLines(startMonth, startYear, noOfLines)
            setLines([
                ...lines,
                ...names.map(name => ({
                    name,
                    description: lineDesc,
                    rate,
                    qty,
                    total: String(rate * qty),
                }))
            ])
            setIsModalOpen(false)
        }
    };
    return (
        <>
            <Button type="primary" onClick={showModal} tw="mt-4" block>
                Add multiple payment
            </Button>
            <Modal
                title="Multiple Payment"
                open={isModalOpen}
                onCancel={hideModal}
                footer={null}
            >
                <Form
                    name="multiple-payment-form"
                    onFinish={onFinish}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    initialValues={{
                        noOfLines: "",
                        startMonth: 1,
                        startYear: 2023,
                        lineDesc: "",
                        rate: "",
                        qty: "",
                    }}
                >
                    <Form.Item
                        label="Number of lines"
                        name="noOfLines"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter valid number of lines.',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                width: 160,
                            }}
                            placeholder="No. of lines"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Start month"
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        <Form.Item
                            name="startMonth"
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                            }}
                        >
                            <Select>
                                {
                                    months.map((month, idx) => (
                                        <Option key={month} value={idx + 1}>
                                            {month}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="startYear"
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 8px',
                            }}
                        >
                            <Select>
                                {
                                    years.map((year) => (
                                        <Option key={year} value={year}>
                                            {year}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="Rate"
                        name="rate"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter valid rate',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                width: 160,
                            }}
                            placeholder="Rate"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="qty"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter valid quantity',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                width: 160,
                            }}
                            placeholder="Quantity"
                        />
                    </Form.Item>
                    <Form.Item label="Line description" name="lineDesc">
                        <TextArea
                            style={{
                                width: '100%',
                            }}
                            rows={3}
                        />
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                        <Button form="multiple-payment-form" type="primary" htmlType="submit">
                            Done
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default FormMultiplePayment;