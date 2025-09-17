'use client'
import { orderApis } from "@/base/apis/order.api";
import { ListParams } from "@/base/models/common.model";
import { OrderModel } from "@/base/models/order.model";
import { RootState } from "@/base/store";
import { OrderStatus } from "@/base/utils/config";
import { orderStatusText } from "@/base/utils/constants";
import { formatCurrency, formatDate } from "@/base/utils/func";
import { Badge, Box, Card, CardMedia, Divider, Paper, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function OrderCustomerForm() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { products, orderCreateInfo, totalPrice } = useSelector((state: RootState) => state.order)
    const { loggedIn, user } = useSelector((state: RootState) => state.session)
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: 10 })
    // QUERY
    const { isLoading, data } = useQuery({
        queryKey: ['list-order', paginationModel, user.userId],
        queryFn: async () => orderApis.getListByCustomer(paginationModel),
        enabled: !!user.userId
    });
    return (
        <Box>
            {( loggedIn ? data?.items :(orderCreateInfo ? [orderCreateInfo] : []))?.map((item: OrderModel) => (
                <Stack component={Paper} p={2} key={item.id} spacing={1} >
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h6">{item.code}</Typography>
                        <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                        <Typography color="textSecondary" variant="body1">{` ${formatDate(item.createdAt || 0)}`}</Typography>
                        <Box>|</Box>
                        <Typography color={item.status === OrderStatus.Completed? 'success': 'error'} variant="button">{orderStatusText.get(item.status)}</Typography>

                        </Stack>
                    </Stack>
                    <Divider/>
                    <Stack px={1} spacing={2}>
                        {(loggedIn ?item.orderItems : products)?.map((p) => (
                            <Stack py={1} key={p.id}  direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Stack spacing={1} direction={'row'} alignContent={'center'}>
                                    <Box>
                                        <CardMedia component="img"
                                            image={p.product?.images?.[0] || p.image}
                                            sx={{
                                                aspectRatio: "1/ 1",
                                                objectFit: "contain",
                                                objectPosition: 'center',
                                                width: 80, height:80
                                            }}
                                        />
                                    </Box>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1">{p.name}</Typography>
                                        <Typography variant="body1" color="textSecondary">{p.classify}</Typography>
                                        <Typography variant="body1" >{`x${p.quantity}`}</Typography>
                                    </Stack>
                                </Stack>
                                <Typography variant="body1" color="primary">{formatCurrency(p.price)}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                    <Typography pt={1} textAlign={'right'} variant="body1" color="textSecondary">{`Thành tiền: `}
                        <Typography variant="h5" color="primary" component={'span'}>{formatCurrency(loggedIn ?item.totalPrice: totalPrice)}</Typography>
                    </Typography>

                </Stack>
            ))}

        </Box>
    )
}