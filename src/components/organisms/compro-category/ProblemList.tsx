import { Container } from '@mui/material'
import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { miikoApiMiikoServiceClient } from 'repository/MiikoApiRepository'
import {
  Problem,
  ProblemListGetRequest,
  ProblemListGetRequest_SortType, ProblemListGetResponse, Tag,
} from 'miiko-api/proto/gen_ts/v1/miiko_pb'
import { CustomLinkCard } from 'components/organisms/CustomCard'
import styles from './ProblemList.module.scss'
import { kiwaApiUsersClient } from 'repository/KiwaApiRepository'
import { UsersMeGetResponse } from 'kiwa-api/typescript-axios-client/api'
import { ManageButton, TagButton, TransitionButton } from 'components/atoms/Button'
import { PathConst } from 'constants/Const'

export const ProblemList = ({page}:{ page: number }): JSX.Element => {

  const [problemList, setProblemList] = useState <Problem[]>([])
  const [isAuthorizedComproCategory, setIsAuthorizedComproCategory] = useState<boolean>(false)
  const LIMIT = 30;

  const problemListGet = async () => {
    const problemListGetRequest = new ProblemListGetRequest({
      sortType: ProblemListGetRequest_SortType.CREATED_TIME,
      offset: page * LIMIT,
      limit: LIMIT,
    })
    const problemListGetResponse = await miikoApiMiikoServiceClient.problemListGet(problemListGetRequest) as ProblemListGetResponse
    kiwaApiUsersClient.usersGet({method: 'GET', withCredentials: true})
      .then((res: { data: UsersMeGetResponse }) => setIsAuthorizedComproCategory(res.data.authority.comproCategory))
      .catch((err: Error) => {
        console.log(err)
      })

    setProblemList(problemListGetResponse.problemList?? [])
  }

  useEffect(() => {
    problemListGet()
  }, [])

  const getTagCardList = (tagList: Tag[]) => {
    return tagList
      .map((it) =>
        <TagButton name={it.topicDisplayName} key={it.topicId} />
      )
  }

  const cardList = problemList
    .sort((l,r) => l.estimation - r.estimation)
    .map((it) =>
      <>
        <CustomLinkCard href={it.url} key={it.problemId}>
          <div>{it.problemDisplayName}</div>
          {getTagCardList(it.tagList)}
        </CustomLinkCard>
        {isAuthorizedComproCategory ? <ManageButton href={PathConst.COMPRO_CATEGORY_PROBLEM_EDIT(it.problemId)} /> : <></> }
      </>
    )

  return (
    <Container>
      {/* TODO ここの説明文にcssを当てる */}
      <Typography variant='body2'>problem list page = {page}</Typography>
      <div className={styles.buttonGrid}>
        <TransitionButton href={PathConst.COMPRO_CATEGORY_PROBLEM_LIST(page-1)} name='←'/>
        <TransitionButton href={PathConst.COMPRO_CATEGORY_PROBLEM_LIST(page+1)} name='→'/>
      </div>

      {isAuthorizedComproCategory ? <ManageButton href={''} /> : <></> }
      {cardList}

    </Container>
  )
}
