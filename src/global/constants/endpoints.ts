const ENDPOINTS = {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    USER: '/user',
    ADDRESS: '/address',
    SEND_OTP: '/otp/send',
    VERIFY_OTP: '/otp/verify',
    PRODUCTS: '/products',
    SELLER_PRODUCTS: "/seller/products",
    SELLERS: '/sellers',
    DEALS: '/deals',
    SELLER_DEALS: '/seller/deals',
    PRODUCT: '/product',
    CUSTOM_REQUEST: '/custom-request',
    BUYER_ORDERS: "/buyer/orders",
    SELLER_ORDERS: "/seller/orders",
    QUOTATION: '/seller/request/quote',
    CHAT: '/chat',
    ORDERS_CHAT: '/orders/chat',
    BUYER_CANCEL_CUSTOM_REQUEST: '/buyer/request/cancel',
    SELLER_CANCEL_CUSTOM_REQUEST: '/seller/request/cancel',
    BUYER_CANCEL_ORDER: '/buyer/order/cancel',
    SELLER_CANCEL_ORDER: '/seller/order/cancel',
    SELLER_ACCEPT_ORDER: '/seller/order/accept',
    SELLER_COMPLETE_ORDER: '/seller/order/complete',
    SELLER_CUSTOM_REQUEST: '/seller/requests',
    BUYER_CUSTOM_REQUEST: '/buyer/requests',
    CHARGE_CUSTOMER: '/charge-customer',
    PAYMENT_METHODS: '/payment-methods',
    ATTACH_PAYMENT_METHOD: "/payment-method/attach",
    PLACE_ORDERS_WITHOUT_STRIPE: '/temp/place/order'
}

export default ENDPOINTS