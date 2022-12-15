import {  Tabs } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledTabs = styled(Tabs)(({ hidden }) => [
 
  css`
    && {
      .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
        border-bottom-color: #fff !important;
        border: 1px solid #f0f0f0;
    }

    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab {
      margin: 0;
      padding: 8px 16px;
 
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
      .card-container p {
        margin: 0;
      }
      .card-container > .ant-tabs-card .ant-tabs-content {
        height: 120px;
        margin-top: -16px;
      }
      .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
        padding: 16px;
        background: #fff;
      }
      .card-container > .ant-tabs-card > .ant-tabs-nav::before {
        display: none;
      }
      .card-container > .ant-tabs-card .ant-tabs-tab,
      [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
        background: transparent;
        border-color: transparent;
      }
      .card-container > .ant-tabs-card .ant-tabs-tab-active,
      [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
        background: #fff;
        border-color: #fff;
      }
      #components-tabs-demo-card-top .code-box-demo {
        padding: 24px;
        overflow: hidden;
        background: #f5f5f5;
      }
      [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
        height: 120px;
        margin-top: -8px;
      }
      [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
        background: transparent;
        border-color: transparent;
      }
      [data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
        background: #000;
      }
      [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
        background: #141414;
      }
      [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
        background: #141414;
        border-color: #141414;
      }
    }
  `,
  /** Example of passing property to the styles */
  hidden && tw`hidden`,
]);
