function delay<T>(time: number): Promise<undefined>;
function delay<T>(time: number, value: T): Promise<T>;
function delay<T>(time: number, value?: T): Promise<T | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), time);
    });
}

type Payment = {
    pg_uid: string;
    store_order_id: number;
    amount: number;
};

const pgDataPaymentsPages: Payment[][] = [
    [
        { pg_uid: 'PG11', store_order_id: 1, amount: 15000 },
        { pg_uid: 'PG12', store_order_id: 2, amount: 25000 },
        { pg_uid: 'PG13', store_order_id: 3, amount: 10000 }
    ],
    [
        { pg_uid: 'PG14', store_order_id: 4, amount: 25000 },
        { pg_uid: 'PG15', store_order_id: 5, amount: 45000 },
        { pg_uid: 'PG16', store_order_id: 6, amount: 15000 }
    ],
    [
        { pg_uid: 'PG17', store_order_id: 7, amount: 20000 },
        { pg_uid: 'PG18', store_order_id: 8, amount: 30000 }
    ],
];

// Payment Gateway API
const PgApi = {
    /**
     * 특정 시간 동안의 모든 결제 내역 조회 (편의상 시간 범위를 지정하는 인자는 생략)
     * @param page 조회할 페이지 번호
     */
    async getPayments(page: number) {
        console.log(`결제 내역 요청: https://pg.com/payments?page=${page}`);
        await delay(500);

        const payments = pgDataPaymentsPages[page - 1] ?? [];
        console.log(
            `${payments.length}개: ${payments.map(p => p.pg_uid).join(', ') || '-'}`
        );

        return payments;
    },

    /**
     * 결제 취소 및 환불
     * @param pg_uid 취소할 결제 ID
     */
    async cancelPayment(pg_uid: string) {
        console.log(`취소 요청: ${pg_uid}`);
        await delay(300);
        return {
            code: 200,
            message: `${pg_uid}: 취소 및 환불 완료`,
            pg_uid,
        };
    }
};