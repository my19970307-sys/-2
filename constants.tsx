
import { TicketStatus, Email, MessagePart, CustomerInfo, TicketDetails } from './types';

export const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    sender: '卢琼',
    subject: '关于试用期员工转正考...',
    preview: '你好，附件是我的转正申请表，请查收。',
    timestamp: '2025-01-05 15:35',
    status: TicketStatus.OVERDUE,
    overdueTime: '74:17',
    isRead: false,
    avatar: 'https://picsum.photos/seed/lu/40/40'
  },
  {
    id: '2',
    sender: '阿里云',
    subject: '云数据库RDS版-CPU使...',
    preview: '您的RDS实例CPU利用率已超过80%，请关注。',
    timestamp: '2025-01-05 10:34',
    status: TicketStatus.OVERDUE,
    overdueTime: '79:16',
    isRead: true,
    avatar: 'https://picsum.photos/seed/ali/40/40'
  },
  {
    id: '3',
    sender: '谢杰',
    subject: '2026新年寄语：从新开...',
    preview: '新年快乐！这是我们的年度寄语。',
    timestamp: '2025-12-31 01:15',
    status: TicketStatus.AWAITING,
    isRead: true,
    avatar: 'https://picsum.photos/seed/xie/40/40'
  },
  {
    id: '4',
    sender: 'Shopify',
    subject: '您已启用两步验证：下...',
    preview: '您的账户安全已提升。',
    timestamp: '2025-12-31 10:35',
    status: TicketStatus.OVERDUE,
    overdueTime: '197:41',
    isRead: true,
    avatar: 'https://picsum.photos/seed/shop/40/40'
  },
  {
    id: '5',
    sender: '黄育乐',
    subject: '回复：测试名单单2',
    preview: '确认收到，谢谢配合。',
    timestamp: '2025-12-31 14:36',
    status: TicketStatus.COMPLETED,
    isRead: true,
    avatar: 'https://picsum.photos/seed/huang/40/40'
  }
];

export const MOCK_CONVERSATION: MessagePart[] = [
  {
    id: 'm1',
    sender: '卢琼',
    time: '2025-08-05 12:24',
    content: '您好，关于我之前反馈的 K90 加热器问题，附件是当时拍摄的异常报告，请帮忙核实进度。',
    attachments: [
      { name: 'temp4cj.png', url: 'https://picsum.photos/seed/att1/300/200', type: 'image' },
      { name: 'log_report.png', url: 'https://picsum.photos/seed/att2/300/200', type: 'image' }
    ]
  },
  {
    id: 'm2',
    sender: '售后工作台 (余思伟)',
    time: '2025-09-01 14:34',
    content: '收到您的反馈，我们已经将该问题提交给技术部门进行复现。请问您所在的站点是 US 还是 EU？我们需要进一步定位。'
  },
  {
    id: 'm3',
    sender: '卢琼',
    time: '2025-09-16 10:40',
    content: '我是 US 站点的。另外补充两张最新的运行截图。',
    attachments: [
      { name: 'capture_01.png', url: 'https://picsum.photos/seed/att3/300/200', type: 'image' },
      { name: 'capture_02.png', url: 'https://picsum.photos/seed/att4/300/200', type: 'image' }
    ]
  }
];

export const MOCK_CUSTOMER: CustomerInfo = {
  name: '卢琼',
  email: 'qiong.lu@1caiweb.com',
  region: '暂无数据',
  tags: ['VIP', 'K90系列']
};

export const MOCK_TICKET: TicketDetails = {
  owner: '余思伟',
  status: '待处理',
  isSecure: false,
  productLine: 'K90热疗 / K90居家系列',
  sku: 'K9015',
  orderId: '--',
  site: 'US',
  memo: '客户反馈加热不稳定，需技术复核。'
};
