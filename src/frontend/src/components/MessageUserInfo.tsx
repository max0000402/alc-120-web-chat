import { userService } from '../services/userService'

interface MessageUserInfoProps {
    userId: number
}

export default function MessageUserInfo(props: MessageUserInfoProps) {
    const { data, isLoading, isError } = userService.useGetUserByIdQuery(props.userId)

    if (isLoading) {
        return (<p>Загрузка</p>)
    }

    if (isError) {
        return (<p>Ошибка получения пользователя {props.userId}</p>)
    }

    if (data === undefined) {
        return (<p>Пользователь не найден</p>)
    }

    return (
        <>
            <p>{data.name}({data.login})</p>
        </>
    )
}