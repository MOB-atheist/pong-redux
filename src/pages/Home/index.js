import React from 'react'
import {
    Container,
    Row,
    Col
} from'react-bootstrap'

export default function Home() {
    return (
        <Container fluid>
            <Row md={6}>
                <Col md={4}>4</Col>
                <Col md={4}>4</Col>
                <Col md={4}>4</Col>
            </Row>
            <Row md={6}>
                <Col md={4}>4</Col>
                <Col md={4}>4</Col>
                <Col md={4}>4</Col>
            </Row>
        </Container>
    )
}