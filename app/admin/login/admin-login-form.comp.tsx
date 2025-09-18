'use client'
import { authApis } from "@/base/apis/auth.api";
import { useAppDispatch } from "@/base/store";
import { setSession } from "@/base/store/slices/session.slice";
import { getUserSessionThunk } from "@/base/store/thunks/user.thunk";
import { showAlertError } from "@/base/ui/toaster";
import { validRequire, validUsername } from "@/base/utils/func";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export function AdminLoginForm() {
    const router = useRouter()
    const dispatch  = useDispatch()
        const dispatchAsync = useAppDispatch()
    const { mutate, isPending } = useMutation({
        mutationFn: authApis.login,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            dispatch(setSession(data))
            dispatchAsync(getUserSessionThunk(data.userId))
            router.push('/admin/dashboard')

        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        
        // TODO call api post
        mutate(data)
    }
    return <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
        <TextFiledControlBase
            name='username'
            getErrorMessage={validUsername}
            inputProps={{ placeholder: 'Your username', required: true, }}
        />
        <TextFiledControlBase
            name='password'
            getErrorMessage={validRequire}
            inputProps={{ placeholder: 'Your password', type: 'password', required: true }}
        />
        <Button
            type="submit"
            fullWidth
            loading={isPending}
            variant="contained"
        >
            {'Submit'}
        </Button>
    </Box>
}