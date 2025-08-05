import { AudioCard } from './audio-card';
import { AudioViewer } from './audio-viewer';
import { Card } from './card';
import { Close } from './close';
import { Col } from './col';
import { ConfigProvider } from './config-provider';
import { Container } from './container';
import { ContextMenu, ContextMenuItem, ContextSubMenu } from './context-menu';
import { Copy } from './copy';
import { DndSort, DndSortItem } from './dnd-sort';
import { Editor } from './editor';
import { Field } from './field';
import { FileCard } from './file-card';
import { Form, FormItem } from './form';
import { FormDialog } from './form-dialog';
import { FormDrawer } from './form-drawer';
import { FormGroup } from './form-group';
import { FormList } from './form-list';
import { FormQuery } from './form-query';
import { Highlight } from './highlight';
import { HorizontalTree } from './horizontal-tree';
import { Icon } from './icon';
import { IconifyIcon } from './iconify-icon';
import { ImageCard } from './image-card';
import { InputNumberRange } from './input-number-range';
import { LongText } from './long-text';
import { Mask } from './mask';
import { MediaCard } from './media-card';
import { MediaCardGroup } from './media-card-group';
import { MediaViewer } from './media-viewer';
import { NumberFormat } from './number-format';
import { OnlyChild } from './only-child';
import { OptionalWrapper } from './optional-wrapper';
import { Panel } from './panel';
import { Row } from './row';
import { ScrollView } from './scroll-view';
import { SnugMenu, SnugMenuItem } from './snug-menu';
import { StackDialog } from './stack-dialog';
import { SvgIcon } from './svg-icon';
import { Table } from './table';
import { TableAction } from './table-action';
import { Toggle } from './toggle';
import { Transition } from './transition';
import { TransitionGroup } from './transition-group';
import { Upload } from './upload';
import { VideoCard } from './video-card';
import { VideoViewer } from './video-viewer';

declare module 'vue' {
  export interface GlobalComponents {
    CoAudioCard: typeof AudioCard;
    CoAudioViewer: typeof AudioViewer;
    CoCard: typeof Card;
    CoClose: typeof Close;
    CoCol: typeof Col;
    CoConfigProvider: typeof ConfigProvider;
    CoContainer: typeof Container;
    CoContextMenu: typeof ContextMenu;
    CoContextMenuItem: typeof ContextMenuItem;
    CoContextSubMenu: typeof ContextSubMenu;
    CoCopy: typeof Copy;
    CoDndSort: typeof DndSort;
    CoDndSortItem: typeof DndSortItem;
    CoEditor: typeof Editor;
    CoField: typeof Field;
    CoFileCard: typeof FileCard;
    CoForm: typeof Form;
    CoFormDialog: typeof FormDialog;
    CoFormDrawer: typeof FormDrawer;
    CoFormGroup: typeof FormGroup;
    CoFormItem: typeof FormItem;
    CoFormList: typeof FormList;
    CoFormQuery: typeof FormQuery;
    CoHighlight: typeof Highlight;
    CoHorizontalTree: typeof HorizontalTree;
    CoIcon: typeof Icon;
    CoIconifyIcon: typeof IconifyIcon;
    CoImageCard: typeof ImageCard;
    CoInputNumberRange: typeof InputNumberRange;
    CoLongText: typeof LongText;
    CoMask: typeof Mask;
    CoMediaCard: typeof MediaCard;
    CoMediaCardGroup: typeof MediaCardGroup;
    CoMediaViewer: typeof MediaViewer;
    CoNumberFormat: typeof NumberFormat;
    CoOnlyChild: typeof OnlyChild;
    CoOptionalWrapper: typeof OptionalWrapper;
    CoPanel: typeof Panel;
    CoRow: typeof Row;
    CoScrollView: typeof ScrollView;
    CoSnugMenu: typeof SnugMenu;
    CoSnugMenuItem: typeof SnugMenuItem;
    CoStackDialog: typeof StackDialog;
    CoSvgIcon: typeof SvgIcon;
    CoTable: typeof Table;
    CoTableAction: typeof TableAction;
    CoToggle: typeof Toggle;
    CoTransition: typeof Transition;
    CoTransitionGroup: typeof TransitionGroup;
    CoUpload: typeof Upload;
    CoVideoCard: typeof VideoCard;
    CoVideoViewer: typeof VideoViewer;
  }
}

export {
  AudioCard,
  AudioViewer,
  Card,
  Close,
  Col,
  ConfigProvider,
  Container,
  ContextMenu,
  ContextMenuItem,
  ContextSubMenu,
  Copy,
  DndSort,
  DndSortItem,
  Editor,
  Field,
  FileCard,
  Form,
  FormDialog,
  FormDrawer,
  FormGroup,
  FormItem,
  FormList,
  FormQuery,
  Highlight,
  HorizontalTree,
  Icon,
  IconifyIcon,
  ImageCard,
  InputNumberRange,
  LongText,
  Mask,
  MediaCard,
  MediaCardGroup,
  MediaViewer,
  NumberFormat,
  OnlyChild,
  OptionalWrapper,
  Panel,
  Row,
  ScrollView,
  SnugMenu,
  SnugMenuItem,
  StackDialog,
  SvgIcon,
  Table,
  TableAction,
  Toggle,
  Transition,
  TransitionGroup,
  Upload,
  VideoCard,
  VideoViewer,
};
