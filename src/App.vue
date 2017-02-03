<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
};
</script>
<style>
*{
  box-sizing: border-box;
}
h2 {
  font-weight: normal;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1800px;
  margin: 0 auto;
}
.form-control {
    display: block;
    width: 100%;
    padding: .45rem .5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: .07143rem solid #ccc;
    border-radius: .25rem;
  }

  .event-date, .event-name {
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
}
.l-mb3 {
    margin-bottom: 30px;
}
.l-mb1 {
    margin-bottom: 10px;
}
.btn{
  padding: .375rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    transition: background .2s ease-out;
    display: inline-block;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: .07143rem solid transparent;
    border-radius: .25rem;
        min-width: 7.5rem;
}
.btn-success {
    color: #fff;
    background-color: #70be4e;
    border-color: #70be4e;
}
.btn.disabled, .disabled.modal-header-close, .modal-header-actions button.disabled, .btn:disabled, .modal-header-close:disabled, .modal-header-actions button:disabled {
    cursor: not-allowed;
    opacity: .65;
     pointer-events: none;
    box-shadow: none;
}
.btn-clear {
    background-color: transparent;
    transition: background .2s ease-out;
}
body{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  margin: 0;
}
.relative {
    position: relative;
}
.scroll-y, .main-panel-body, .page-layout-body-inner {
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
body, .bg-gray-l2 {
    background-color: #eee;
}
.container, .page-layout-body-inner, .dashboard-layout-body-inner {
    max-width: 1140px;
    margin: 0 auto;
}
.shadow-b1 {
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.37);
}
.bg-white {
    background-color: #fff;
}

.flex-auto, .card .card-content, .main-panel-body, .main-panel-body.main-panel-body-center>div, .page-layout-body {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
}
.flex, .card, .main-panel, .main-panel-body.main-panel-body-center, .page-layout-wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.flex-column, .main-panel, .page-layout-wrapper {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}
.text-sm{
  font-size: 14px;
}

.text-light{
  color: #a2a2a2;
}

.container, .page-layout-body-inner {
    max-width: 1140px;
}
.l-px2 {
    padding-left: 20px;
    padding-right: 20px;
}
.event-header {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
}

.event-header__left {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 220px;
}
.event-header__center, .event-header__left, .event-header__right {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.event-header__center {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: #a2a2a2;
}
.event-header__right {
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
@media (min-width: 768px)
{
  .event-header__right {
    width: 220px;
    position: relative;
  }
}
.event-header__event {
    font-weight: 700;
    cursor: pointer;
}
.truncate, .btn, .modal-header-close, .modal-header-actions button {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;modal
    white-space: nowrap;
}

.create-component {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 75px;
    padding: 0 20px;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
}
.create-component--bottom-border {
    border-bottom: 1px solid #dfeaf0;
}
.create-component--perma-bg, .create-component--perma-bg input {
    background-color: #fbf9fe;
}
.no-shrink {
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}
.pointer {
    cursor: pointer;
}
.create-component label {
    -webkit-order: -1;
    -ms-flex-order: -1;
    order: -1;
    cursor: pointer;
    margin: 0;
    padding-right: 15px;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.stretch-horizontal, .stretch-x, .page-layout-body-inner {
    width: 100%;
}
.create-component__placeholder {
    color: #a0a5a8;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.modal {
    z-index: 1050;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}
.modal, .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.modal .modal-content, .modal .modal-dialog {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 620px;
    max-height: 80%;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.modal-dialog, .modal-header {
    background: #fff;
    position: relative;
    text-align: left;
}
.modal-dialog {
    border-radius: .3rem;
    overflow: hidden;
    box-shadow: 0 0 13px 0 rgba(0,0,0,.15);
    width: 620px;
    margin: 4rem auto;
    color: dimgray;
    z-index: 1041;
}

.modal-backdrop {
    z-index: 1040;
    transition: none;
    background-color: rgba(106,136,154,.45);
    transition: .5s opacity ease;
}
.modal-body {
    background: #fafafa;
    padding: 1rem;
    min-height: 60px;
}
.modal-footer {
    border-top: 1px solid #ced7df;
    background: #f4f4f4;
    padding: 1rem;
    min-height: 3.3rem;
}
.modal-footer {
      border-top: 1px solid #ced7df;
    background: #f4f4f4;
    padding: 1rem;
    min-height: 3.3rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.flex-none, .card .card-avatar, .card .card-actions, .main-panel-header, .main-panel-footer, .page-layout-header {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
}
.right {
    float: right;
}
.btn.btn-narrow, .btn-narrow.modal-header-close, .modal-header-actions button.btn-narrow, .btn.btn-clear {
    min-width: 0;
    padding-left: .5rem;
    padding-right: .5rem;
    }
.mx1 {
    margin-left: .4rem;
    margin-right: .4rem;
}
.mt2 {
    margin-top: 1rem;
}
.px3 {
    padding-left: 2rem;
    padding-right: 2rem;
}
.text-center{
    text-align: center;
}
.btn-primary {
    color: #fff;
    background-color: #4285f4;
    border-color: #4285f4;
}    
.py07 {
    padding-top: .7rem;
    padding-bottom: .7rem;
}
.ui-bgc-grey-header {
    background-color: #f6f6f6;
}
.shadow-b2 {
    box-shadow: 0 6px 10px 0 rgba(0,0,0,.3);
}
.header-general {
    padding: 0 25px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 4.2rem;
}
.header-general__nav--left {
    color: #9c9c9c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 17px;
}

.header-general__content {
    -webkit-flex: 1 0 auto;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    text-align: right;
}

.flex-center, .card, .main-panel-body.main-panel-body-center {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.flex-justify {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.em-bar {
    padding: 0 25px;
    height: 51px;
    width: 100%;
    margin: 0 auto;
}
.event-header-switcher {
    background-color: #666;
    height: 27px;
    position: relative;
    color: #fff;
}
.event-header-switcher__back {
    -webkit-flex-basis: 180px;
    -ms-flex-preferred-size: 180px;
    flex-basis: 180px;
}
.event-header-switcher__back a {
    font-size: 12px;
    height: 27px;
    line-height: 27px;
    display: inline-block;
    color: #fff;
}
.view-switcher span, .view-switcher a{
    color: #fff;
    font-size: 13px;
    height: 27px;
    line-height: 27px;
    display: inline-block;
    position: relative;
    width: 130px;
    margin: 0 10px;
    cursor: pointer;
    text-align: center;
}
.view-switcher span.active, .view-switcher a.active{
    text-decoration: none;
    font-weight: 700;
    border-bottom: 3px solid #fff;
}

.present-item {
    height: 70px;
    padding: 0 9px 0 20px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    border-bottom: 1px solid #e5eef8;
    background: #fff;
    position: relative;
}
.present-item__icon {
    margin-right: 1rem;
}
.present-item__content {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
    width: 0;
}
.present-item__actions {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}
.present-item__votes {
    font-size: 13px;
    line-height: 18px;
    color: #222;
}
@media (min-width: 544px)
{
  .container, .page-layout-body-inner, .dashboard-layout-body-inner {
    max-width: 576px;
  }
}
@media (min-width: 768px)
{
  .container, .page-layout-body-inner, .dashboard-layout-body-inner {
    max-width: 720px;
  }
  .header-general__content {
    text-align: center;
}
}

@media (min-width: 992px)
{
  .container, .page-layout-body-inner, .dashboard-layout-body-inner{
    max-width: 940px;
  }
}
@media (min-width: 1200px)
{
    body{
        font-size: 20px;
    }
  .container, .page-layout-body-inner, .dashboard-layout-body-inner {
    max-width: 1140px;
  }
}
@media (min-width: 1600px)
{
  .dashboard-layout-body-inner{
    max-width: 1440px;
  }
}
</style>
