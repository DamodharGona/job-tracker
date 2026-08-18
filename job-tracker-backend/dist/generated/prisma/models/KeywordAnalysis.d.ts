import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model KeywordAnalysis
 *
 */
export type KeywordAnalysisModel = runtime.Types.Result.DefaultSelection<Prisma.$KeywordAnalysisPayload>;
export type AggregateKeywordAnalysis = {
    _count: KeywordAnalysisCountAggregateOutputType | null;
    _min: KeywordAnalysisMinAggregateOutputType | null;
    _max: KeywordAnalysisMaxAggregateOutputType | null;
};
export type KeywordAnalysisMinAggregateOutputType = {
    id: string | null;
    applicationId: string | null;
    advisoryNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type KeywordAnalysisMaxAggregateOutputType = {
    id: string | null;
    applicationId: string | null;
    advisoryNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type KeywordAnalysisCountAggregateOutputType = {
    id: number;
    applicationId: number;
    keywords: number;
    tailoredBullets: number;
    advisoryNote: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type KeywordAnalysisMinAggregateInputType = {
    id?: true;
    applicationId?: true;
    advisoryNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type KeywordAnalysisMaxAggregateInputType = {
    id?: true;
    applicationId?: true;
    advisoryNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type KeywordAnalysisCountAggregateInputType = {
    id?: true;
    applicationId?: true;
    keywords?: true;
    tailoredBullets?: true;
    advisoryNote?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type KeywordAnalysisAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KeywordAnalysis to aggregate.
     */
    where?: Prisma.KeywordAnalysisWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KeywordAnalyses to fetch.
     */
    orderBy?: Prisma.KeywordAnalysisOrderByWithRelationInput | Prisma.KeywordAnalysisOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.KeywordAnalysisWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KeywordAnalyses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KeywordAnalyses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned KeywordAnalyses
    **/
    _count?: true | KeywordAnalysisCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: KeywordAnalysisMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: KeywordAnalysisMaxAggregateInputType;
};
export type GetKeywordAnalysisAggregateType<T extends KeywordAnalysisAggregateArgs> = {
    [P in keyof T & keyof AggregateKeywordAnalysis]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKeywordAnalysis[P]> : Prisma.GetScalarType<T[P], AggregateKeywordAnalysis[P]>;
};
export type KeywordAnalysisGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KeywordAnalysisWhereInput;
    orderBy?: Prisma.KeywordAnalysisOrderByWithAggregationInput | Prisma.KeywordAnalysisOrderByWithAggregationInput[];
    by: Prisma.KeywordAnalysisScalarFieldEnum[] | Prisma.KeywordAnalysisScalarFieldEnum;
    having?: Prisma.KeywordAnalysisScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KeywordAnalysisCountAggregateInputType | true;
    _min?: KeywordAnalysisMinAggregateInputType;
    _max?: KeywordAnalysisMaxAggregateInputType;
};
export type KeywordAnalysisGroupByOutputType = {
    id: string;
    applicationId: string;
    keywords: runtime.JsonValue;
    tailoredBullets: runtime.JsonValue;
    advisoryNote: string;
    createdAt: Date;
    updatedAt: Date;
    _count: KeywordAnalysisCountAggregateOutputType | null;
    _min: KeywordAnalysisMinAggregateOutputType | null;
    _max: KeywordAnalysisMaxAggregateOutputType | null;
};
export type GetKeywordAnalysisGroupByPayload<T extends KeywordAnalysisGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KeywordAnalysisGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KeywordAnalysisGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KeywordAnalysisGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KeywordAnalysisGroupByOutputType[P]>;
}>>;
export type KeywordAnalysisWhereInput = {
    AND?: Prisma.KeywordAnalysisWhereInput | Prisma.KeywordAnalysisWhereInput[];
    OR?: Prisma.KeywordAnalysisWhereInput[];
    NOT?: Prisma.KeywordAnalysisWhereInput | Prisma.KeywordAnalysisWhereInput[];
    id?: Prisma.StringFilter<"KeywordAnalysis"> | string;
    applicationId?: Prisma.StringFilter<"KeywordAnalysis"> | string;
    keywords?: Prisma.JsonFilter<"KeywordAnalysis">;
    tailoredBullets?: Prisma.JsonFilter<"KeywordAnalysis">;
    advisoryNote?: Prisma.StringFilter<"KeywordAnalysis"> | string;
    createdAt?: Prisma.DateTimeFilter<"KeywordAnalysis"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"KeywordAnalysis"> | Date | string;
    application?: Prisma.XOR<Prisma.JobApplicationScalarRelationFilter, Prisma.JobApplicationWhereInput>;
};
export type KeywordAnalysisOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    keywords?: Prisma.SortOrder;
    tailoredBullets?: Prisma.SortOrder;
    advisoryNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    application?: Prisma.JobApplicationOrderByWithRelationInput;
};
export type KeywordAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    applicationId?: string;
    AND?: Prisma.KeywordAnalysisWhereInput | Prisma.KeywordAnalysisWhereInput[];
    OR?: Prisma.KeywordAnalysisWhereInput[];
    NOT?: Prisma.KeywordAnalysisWhereInput | Prisma.KeywordAnalysisWhereInput[];
    keywords?: Prisma.JsonFilter<"KeywordAnalysis">;
    tailoredBullets?: Prisma.JsonFilter<"KeywordAnalysis">;
    advisoryNote?: Prisma.StringFilter<"KeywordAnalysis"> | string;
    createdAt?: Prisma.DateTimeFilter<"KeywordAnalysis"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"KeywordAnalysis"> | Date | string;
    application?: Prisma.XOR<Prisma.JobApplicationScalarRelationFilter, Prisma.JobApplicationWhereInput>;
}, "id" | "applicationId">;
export type KeywordAnalysisOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    keywords?: Prisma.SortOrder;
    tailoredBullets?: Prisma.SortOrder;
    advisoryNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.KeywordAnalysisCountOrderByAggregateInput;
    _max?: Prisma.KeywordAnalysisMaxOrderByAggregateInput;
    _min?: Prisma.KeywordAnalysisMinOrderByAggregateInput;
};
export type KeywordAnalysisScalarWhereWithAggregatesInput = {
    AND?: Prisma.KeywordAnalysisScalarWhereWithAggregatesInput | Prisma.KeywordAnalysisScalarWhereWithAggregatesInput[];
    OR?: Prisma.KeywordAnalysisScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KeywordAnalysisScalarWhereWithAggregatesInput | Prisma.KeywordAnalysisScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"KeywordAnalysis"> | string;
    applicationId?: Prisma.StringWithAggregatesFilter<"KeywordAnalysis"> | string;
    keywords?: Prisma.JsonWithAggregatesFilter<"KeywordAnalysis">;
    tailoredBullets?: Prisma.JsonWithAggregatesFilter<"KeywordAnalysis">;
    advisoryNote?: Prisma.StringWithAggregatesFilter<"KeywordAnalysis"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"KeywordAnalysis"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"KeywordAnalysis"> | Date | string;
};
export type KeywordAnalysisCreateInput = {
    id?: string;
    keywords: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    application: Prisma.JobApplicationCreateNestedOneWithoutKeywordAnalysesInput;
};
export type KeywordAnalysisUncheckedCreateInput = {
    id?: string;
    applicationId: string;
    keywords: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type KeywordAnalysisUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    keywords?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    application?: Prisma.JobApplicationUpdateOneRequiredWithoutKeywordAnalysesNestedInput;
};
export type KeywordAnalysisUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    applicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    keywords?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeywordAnalysisCreateManyInput = {
    id?: string;
    applicationId: string;
    keywords: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type KeywordAnalysisUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    keywords?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeywordAnalysisUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    applicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    keywords?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeywordAnalysisListRelationFilter = {
    every?: Prisma.KeywordAnalysisWhereInput;
    some?: Prisma.KeywordAnalysisWhereInput;
    none?: Prisma.KeywordAnalysisWhereInput;
};
export type KeywordAnalysisOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type KeywordAnalysisCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    keywords?: Prisma.SortOrder;
    tailoredBullets?: Prisma.SortOrder;
    advisoryNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KeywordAnalysisMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    advisoryNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KeywordAnalysisMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    advisoryNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type KeywordAnalysisCreateNestedManyWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.KeywordAnalysisCreateWithoutApplicationInput, Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput> | Prisma.KeywordAnalysisCreateWithoutApplicationInput[] | Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput[];
    connectOrCreate?: Prisma.KeywordAnalysisCreateOrConnectWithoutApplicationInput | Prisma.KeywordAnalysisCreateOrConnectWithoutApplicationInput[];
    createMany?: Prisma.KeywordAnalysisCreateManyApplicationInputEnvelope;
    connect?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
};
export type KeywordAnalysisUncheckedCreateNestedManyWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.KeywordAnalysisCreateWithoutApplicationInput, Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput> | Prisma.KeywordAnalysisCreateWithoutApplicationInput[] | Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput[];
    connectOrCreate?: Prisma.KeywordAnalysisCreateOrConnectWithoutApplicationInput | Prisma.KeywordAnalysisCreateOrConnectWithoutApplicationInput[];
    createMany?: Prisma.KeywordAnalysisCreateManyApplicationInputEnvelope;
    connect?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
};
export type KeywordAnalysisUpdateManyWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.KeywordAnalysisCreateWithoutApplicationInput, Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput> | Prisma.KeywordAnalysisCreateWithoutApplicationInput[] | Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput[];
    connectOrCreate?: Prisma.KeywordAnalysisCreateOrConnectWithoutApplicationInput | Prisma.KeywordAnalysisCreateOrConnectWithoutApplicationInput[];
    upsert?: Prisma.KeywordAnalysisUpsertWithWhereUniqueWithoutApplicationInput | Prisma.KeywordAnalysisUpsertWithWhereUniqueWithoutApplicationInput[];
    createMany?: Prisma.KeywordAnalysisCreateManyApplicationInputEnvelope;
    set?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
    disconnect?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
    delete?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
    connect?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
    update?: Prisma.KeywordAnalysisUpdateWithWhereUniqueWithoutApplicationInput | Prisma.KeywordAnalysisUpdateWithWhereUniqueWithoutApplicationInput[];
    updateMany?: Prisma.KeywordAnalysisUpdateManyWithWhereWithoutApplicationInput | Prisma.KeywordAnalysisUpdateManyWithWhereWithoutApplicationInput[];
    deleteMany?: Prisma.KeywordAnalysisScalarWhereInput | Prisma.KeywordAnalysisScalarWhereInput[];
};
export type KeywordAnalysisUncheckedUpdateManyWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.KeywordAnalysisCreateWithoutApplicationInput, Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput> | Prisma.KeywordAnalysisCreateWithoutApplicationInput[] | Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput[];
    connectOrCreate?: Prisma.KeywordAnalysisCreateOrConnectWithoutApplicationInput | Prisma.KeywordAnalysisCreateOrConnectWithoutApplicationInput[];
    upsert?: Prisma.KeywordAnalysisUpsertWithWhereUniqueWithoutApplicationInput | Prisma.KeywordAnalysisUpsertWithWhereUniqueWithoutApplicationInput[];
    createMany?: Prisma.KeywordAnalysisCreateManyApplicationInputEnvelope;
    set?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
    disconnect?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
    delete?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
    connect?: Prisma.KeywordAnalysisWhereUniqueInput | Prisma.KeywordAnalysisWhereUniqueInput[];
    update?: Prisma.KeywordAnalysisUpdateWithWhereUniqueWithoutApplicationInput | Prisma.KeywordAnalysisUpdateWithWhereUniqueWithoutApplicationInput[];
    updateMany?: Prisma.KeywordAnalysisUpdateManyWithWhereWithoutApplicationInput | Prisma.KeywordAnalysisUpdateManyWithWhereWithoutApplicationInput[];
    deleteMany?: Prisma.KeywordAnalysisScalarWhereInput | Prisma.KeywordAnalysisScalarWhereInput[];
};
export type KeywordAnalysisCreateWithoutApplicationInput = {
    id?: string;
    keywords: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type KeywordAnalysisUncheckedCreateWithoutApplicationInput = {
    id?: string;
    keywords: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type KeywordAnalysisCreateOrConnectWithoutApplicationInput = {
    where: Prisma.KeywordAnalysisWhereUniqueInput;
    create: Prisma.XOR<Prisma.KeywordAnalysisCreateWithoutApplicationInput, Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput>;
};
export type KeywordAnalysisCreateManyApplicationInputEnvelope = {
    data: Prisma.KeywordAnalysisCreateManyApplicationInput | Prisma.KeywordAnalysisCreateManyApplicationInput[];
    skipDuplicates?: boolean;
};
export type KeywordAnalysisUpsertWithWhereUniqueWithoutApplicationInput = {
    where: Prisma.KeywordAnalysisWhereUniqueInput;
    update: Prisma.XOR<Prisma.KeywordAnalysisUpdateWithoutApplicationInput, Prisma.KeywordAnalysisUncheckedUpdateWithoutApplicationInput>;
    create: Prisma.XOR<Prisma.KeywordAnalysisCreateWithoutApplicationInput, Prisma.KeywordAnalysisUncheckedCreateWithoutApplicationInput>;
};
export type KeywordAnalysisUpdateWithWhereUniqueWithoutApplicationInput = {
    where: Prisma.KeywordAnalysisWhereUniqueInput;
    data: Prisma.XOR<Prisma.KeywordAnalysisUpdateWithoutApplicationInput, Prisma.KeywordAnalysisUncheckedUpdateWithoutApplicationInput>;
};
export type KeywordAnalysisUpdateManyWithWhereWithoutApplicationInput = {
    where: Prisma.KeywordAnalysisScalarWhereInput;
    data: Prisma.XOR<Prisma.KeywordAnalysisUpdateManyMutationInput, Prisma.KeywordAnalysisUncheckedUpdateManyWithoutApplicationInput>;
};
export type KeywordAnalysisScalarWhereInput = {
    AND?: Prisma.KeywordAnalysisScalarWhereInput | Prisma.KeywordAnalysisScalarWhereInput[];
    OR?: Prisma.KeywordAnalysisScalarWhereInput[];
    NOT?: Prisma.KeywordAnalysisScalarWhereInput | Prisma.KeywordAnalysisScalarWhereInput[];
    id?: Prisma.StringFilter<"KeywordAnalysis"> | string;
    applicationId?: Prisma.StringFilter<"KeywordAnalysis"> | string;
    keywords?: Prisma.JsonFilter<"KeywordAnalysis">;
    tailoredBullets?: Prisma.JsonFilter<"KeywordAnalysis">;
    advisoryNote?: Prisma.StringFilter<"KeywordAnalysis"> | string;
    createdAt?: Prisma.DateTimeFilter<"KeywordAnalysis"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"KeywordAnalysis"> | Date | string;
};
export type KeywordAnalysisCreateManyApplicationInput = {
    id?: string;
    keywords: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type KeywordAnalysisUpdateWithoutApplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    keywords?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeywordAnalysisUncheckedUpdateWithoutApplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    keywords?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeywordAnalysisUncheckedUpdateManyWithoutApplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    keywords?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    tailoredBullets?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    advisoryNote?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeywordAnalysisSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    keywords?: boolean;
    tailoredBullets?: boolean;
    advisoryNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    application?: boolean | Prisma.JobApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["keywordAnalysis"]>;
export type KeywordAnalysisSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    keywords?: boolean;
    tailoredBullets?: boolean;
    advisoryNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    application?: boolean | Prisma.JobApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["keywordAnalysis"]>;
export type KeywordAnalysisSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    keywords?: boolean;
    tailoredBullets?: boolean;
    advisoryNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    application?: boolean | Prisma.JobApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["keywordAnalysis"]>;
export type KeywordAnalysisSelectScalar = {
    id?: boolean;
    applicationId?: boolean;
    keywords?: boolean;
    tailoredBullets?: boolean;
    advisoryNote?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type KeywordAnalysisOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "applicationId" | "keywords" | "tailoredBullets" | "advisoryNote" | "createdAt" | "updatedAt", ExtArgs["result"]["keywordAnalysis"]>;
export type KeywordAnalysisInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.JobApplicationDefaultArgs<ExtArgs>;
};
export type KeywordAnalysisIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.JobApplicationDefaultArgs<ExtArgs>;
};
export type KeywordAnalysisIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.JobApplicationDefaultArgs<ExtArgs>;
};
export type $KeywordAnalysisPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KeywordAnalysis";
    objects: {
        application: Prisma.$JobApplicationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        applicationId: string;
        keywords: runtime.JsonValue;
        tailoredBullets: runtime.JsonValue;
        advisoryNote: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["keywordAnalysis"]>;
    composites: {};
};
export type KeywordAnalysisGetPayload<S extends boolean | null | undefined | KeywordAnalysisDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload, S>;
export type KeywordAnalysisCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KeywordAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KeywordAnalysisCountAggregateInputType | true;
};
export interface KeywordAnalysisDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KeywordAnalysis'];
        meta: {
            name: 'KeywordAnalysis';
        };
    };
    /**
     * Find zero or one KeywordAnalysis that matches the filter.
     * @param {KeywordAnalysisFindUniqueArgs} args - Arguments to find a KeywordAnalysis
     * @example
     * // Get one KeywordAnalysis
     * const keywordAnalysis = await prisma.keywordAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KeywordAnalysisFindUniqueArgs>(args: Prisma.SelectSubset<T, KeywordAnalysisFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KeywordAnalysisClient<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one KeywordAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KeywordAnalysisFindUniqueOrThrowArgs} args - Arguments to find a KeywordAnalysis
     * @example
     * // Get one KeywordAnalysis
     * const keywordAnalysis = await prisma.keywordAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KeywordAnalysisFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KeywordAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KeywordAnalysisClient<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first KeywordAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordAnalysisFindFirstArgs} args - Arguments to find a KeywordAnalysis
     * @example
     * // Get one KeywordAnalysis
     * const keywordAnalysis = await prisma.keywordAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KeywordAnalysisFindFirstArgs>(args?: Prisma.SelectSubset<T, KeywordAnalysisFindFirstArgs<ExtArgs>>): Prisma.Prisma__KeywordAnalysisClient<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first KeywordAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordAnalysisFindFirstOrThrowArgs} args - Arguments to find a KeywordAnalysis
     * @example
     * // Get one KeywordAnalysis
     * const keywordAnalysis = await prisma.keywordAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KeywordAnalysisFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KeywordAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KeywordAnalysisClient<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more KeywordAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KeywordAnalyses
     * const keywordAnalyses = await prisma.keywordAnalysis.findMany()
     *
     * // Get first 10 KeywordAnalyses
     * const keywordAnalyses = await prisma.keywordAnalysis.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const keywordAnalysisWithIdOnly = await prisma.keywordAnalysis.findMany({ select: { id: true } })
     *
     */
    findMany<T extends KeywordAnalysisFindManyArgs>(args?: Prisma.SelectSubset<T, KeywordAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a KeywordAnalysis.
     * @param {KeywordAnalysisCreateArgs} args - Arguments to create a KeywordAnalysis.
     * @example
     * // Create one KeywordAnalysis
     * const KeywordAnalysis = await prisma.keywordAnalysis.create({
     *   data: {
     *     // ... data to create a KeywordAnalysis
     *   }
     * })
     *
     */
    create<T extends KeywordAnalysisCreateArgs>(args: Prisma.SelectSubset<T, KeywordAnalysisCreateArgs<ExtArgs>>): Prisma.Prisma__KeywordAnalysisClient<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many KeywordAnalyses.
     * @param {KeywordAnalysisCreateManyArgs} args - Arguments to create many KeywordAnalyses.
     * @example
     * // Create many KeywordAnalyses
     * const keywordAnalysis = await prisma.keywordAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends KeywordAnalysisCreateManyArgs>(args?: Prisma.SelectSubset<T, KeywordAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many KeywordAnalyses and returns the data saved in the database.
     * @param {KeywordAnalysisCreateManyAndReturnArgs} args - Arguments to create many KeywordAnalyses.
     * @example
     * // Create many KeywordAnalyses
     * const keywordAnalysis = await prisma.keywordAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many KeywordAnalyses and only return the `id`
     * const keywordAnalysisWithIdOnly = await prisma.keywordAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends KeywordAnalysisCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, KeywordAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a KeywordAnalysis.
     * @param {KeywordAnalysisDeleteArgs} args - Arguments to delete one KeywordAnalysis.
     * @example
     * // Delete one KeywordAnalysis
     * const KeywordAnalysis = await prisma.keywordAnalysis.delete({
     *   where: {
     *     // ... filter to delete one KeywordAnalysis
     *   }
     * })
     *
     */
    delete<T extends KeywordAnalysisDeleteArgs>(args: Prisma.SelectSubset<T, KeywordAnalysisDeleteArgs<ExtArgs>>): Prisma.Prisma__KeywordAnalysisClient<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one KeywordAnalysis.
     * @param {KeywordAnalysisUpdateArgs} args - Arguments to update one KeywordAnalysis.
     * @example
     * // Update one KeywordAnalysis
     * const keywordAnalysis = await prisma.keywordAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends KeywordAnalysisUpdateArgs>(args: Prisma.SelectSubset<T, KeywordAnalysisUpdateArgs<ExtArgs>>): Prisma.Prisma__KeywordAnalysisClient<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more KeywordAnalyses.
     * @param {KeywordAnalysisDeleteManyArgs} args - Arguments to filter KeywordAnalyses to delete.
     * @example
     * // Delete a few KeywordAnalyses
     * const { count } = await prisma.keywordAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends KeywordAnalysisDeleteManyArgs>(args?: Prisma.SelectSubset<T, KeywordAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more KeywordAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KeywordAnalyses
     * const keywordAnalysis = await prisma.keywordAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends KeywordAnalysisUpdateManyArgs>(args: Prisma.SelectSubset<T, KeywordAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more KeywordAnalyses and returns the data updated in the database.
     * @param {KeywordAnalysisUpdateManyAndReturnArgs} args - Arguments to update many KeywordAnalyses.
     * @example
     * // Update many KeywordAnalyses
     * const keywordAnalysis = await prisma.keywordAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more KeywordAnalyses and only return the `id`
     * const keywordAnalysisWithIdOnly = await prisma.keywordAnalysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends KeywordAnalysisUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, KeywordAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one KeywordAnalysis.
     * @param {KeywordAnalysisUpsertArgs} args - Arguments to update or create a KeywordAnalysis.
     * @example
     * // Update or create a KeywordAnalysis
     * const keywordAnalysis = await prisma.keywordAnalysis.upsert({
     *   create: {
     *     // ... data to create a KeywordAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KeywordAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends KeywordAnalysisUpsertArgs>(args: Prisma.SelectSubset<T, KeywordAnalysisUpsertArgs<ExtArgs>>): Prisma.Prisma__KeywordAnalysisClient<runtime.Types.Result.GetResult<Prisma.$KeywordAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of KeywordAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordAnalysisCountArgs} args - Arguments to filter KeywordAnalyses to count.
     * @example
     * // Count the number of KeywordAnalyses
     * const count = await prisma.keywordAnalysis.count({
     *   where: {
     *     // ... the filter for the KeywordAnalyses we want to count
     *   }
     * })
    **/
    count<T extends KeywordAnalysisCountArgs>(args?: Prisma.Subset<T, KeywordAnalysisCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KeywordAnalysisCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a KeywordAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KeywordAnalysisAggregateArgs>(args: Prisma.Subset<T, KeywordAnalysisAggregateArgs>): Prisma.PrismaPromise<GetKeywordAnalysisAggregateType<T>>;
    /**
     * Group by KeywordAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends KeywordAnalysisGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KeywordAnalysisGroupByArgs['orderBy'];
    } : {
        orderBy?: KeywordAnalysisGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KeywordAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKeywordAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the KeywordAnalysis model
     */
    readonly fields: KeywordAnalysisFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for KeywordAnalysis.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__KeywordAnalysisClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    application<T extends Prisma.JobApplicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JobApplicationDefaultArgs<ExtArgs>>): Prisma.Prisma__JobApplicationClient<runtime.Types.Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the KeywordAnalysis model
 */
export interface KeywordAnalysisFieldRefs {
    readonly id: Prisma.FieldRef<"KeywordAnalysis", 'String'>;
    readonly applicationId: Prisma.FieldRef<"KeywordAnalysis", 'String'>;
    readonly keywords: Prisma.FieldRef<"KeywordAnalysis", 'Json'>;
    readonly tailoredBullets: Prisma.FieldRef<"KeywordAnalysis", 'Json'>;
    readonly advisoryNote: Prisma.FieldRef<"KeywordAnalysis", 'String'>;
    readonly createdAt: Prisma.FieldRef<"KeywordAnalysis", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"KeywordAnalysis", 'DateTime'>;
}
/**
 * KeywordAnalysis findUnique
 */
export type KeywordAnalysisFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * Filter, which KeywordAnalysis to fetch.
     */
    where: Prisma.KeywordAnalysisWhereUniqueInput;
};
/**
 * KeywordAnalysis findUniqueOrThrow
 */
export type KeywordAnalysisFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * Filter, which KeywordAnalysis to fetch.
     */
    where: Prisma.KeywordAnalysisWhereUniqueInput;
};
/**
 * KeywordAnalysis findFirst
 */
export type KeywordAnalysisFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * Filter, which KeywordAnalysis to fetch.
     */
    where?: Prisma.KeywordAnalysisWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KeywordAnalyses to fetch.
     */
    orderBy?: Prisma.KeywordAnalysisOrderByWithRelationInput | Prisma.KeywordAnalysisOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for KeywordAnalyses.
     */
    cursor?: Prisma.KeywordAnalysisWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KeywordAnalyses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KeywordAnalyses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KeywordAnalyses.
     */
    distinct?: Prisma.KeywordAnalysisScalarFieldEnum | Prisma.KeywordAnalysisScalarFieldEnum[];
};
/**
 * KeywordAnalysis findFirstOrThrow
 */
export type KeywordAnalysisFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * Filter, which KeywordAnalysis to fetch.
     */
    where?: Prisma.KeywordAnalysisWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KeywordAnalyses to fetch.
     */
    orderBy?: Prisma.KeywordAnalysisOrderByWithRelationInput | Prisma.KeywordAnalysisOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for KeywordAnalyses.
     */
    cursor?: Prisma.KeywordAnalysisWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KeywordAnalyses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KeywordAnalyses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KeywordAnalyses.
     */
    distinct?: Prisma.KeywordAnalysisScalarFieldEnum | Prisma.KeywordAnalysisScalarFieldEnum[];
};
/**
 * KeywordAnalysis findMany
 */
export type KeywordAnalysisFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * Filter, which KeywordAnalyses to fetch.
     */
    where?: Prisma.KeywordAnalysisWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KeywordAnalyses to fetch.
     */
    orderBy?: Prisma.KeywordAnalysisOrderByWithRelationInput | Prisma.KeywordAnalysisOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing KeywordAnalyses.
     */
    cursor?: Prisma.KeywordAnalysisWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KeywordAnalyses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KeywordAnalyses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KeywordAnalyses.
     */
    distinct?: Prisma.KeywordAnalysisScalarFieldEnum | Prisma.KeywordAnalysisScalarFieldEnum[];
};
/**
 * KeywordAnalysis create
 */
export type KeywordAnalysisCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * The data needed to create a KeywordAnalysis.
     */
    data: Prisma.XOR<Prisma.KeywordAnalysisCreateInput, Prisma.KeywordAnalysisUncheckedCreateInput>;
};
/**
 * KeywordAnalysis createMany
 */
export type KeywordAnalysisCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many KeywordAnalyses.
     */
    data: Prisma.KeywordAnalysisCreateManyInput | Prisma.KeywordAnalysisCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * KeywordAnalysis createManyAndReturn
 */
export type KeywordAnalysisCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * The data used to create many KeywordAnalyses.
     */
    data: Prisma.KeywordAnalysisCreateManyInput | Prisma.KeywordAnalysisCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * KeywordAnalysis update
 */
export type KeywordAnalysisUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * The data needed to update a KeywordAnalysis.
     */
    data: Prisma.XOR<Prisma.KeywordAnalysisUpdateInput, Prisma.KeywordAnalysisUncheckedUpdateInput>;
    /**
     * Choose, which KeywordAnalysis to update.
     */
    where: Prisma.KeywordAnalysisWhereUniqueInput;
};
/**
 * KeywordAnalysis updateMany
 */
export type KeywordAnalysisUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update KeywordAnalyses.
     */
    data: Prisma.XOR<Prisma.KeywordAnalysisUpdateManyMutationInput, Prisma.KeywordAnalysisUncheckedUpdateManyInput>;
    /**
     * Filter which KeywordAnalyses to update
     */
    where?: Prisma.KeywordAnalysisWhereInput;
    /**
     * Limit how many KeywordAnalyses to update.
     */
    limit?: number;
};
/**
 * KeywordAnalysis updateManyAndReturn
 */
export type KeywordAnalysisUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * The data used to update KeywordAnalyses.
     */
    data: Prisma.XOR<Prisma.KeywordAnalysisUpdateManyMutationInput, Prisma.KeywordAnalysisUncheckedUpdateManyInput>;
    /**
     * Filter which KeywordAnalyses to update
     */
    where?: Prisma.KeywordAnalysisWhereInput;
    /**
     * Limit how many KeywordAnalyses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * KeywordAnalysis upsert
 */
export type KeywordAnalysisUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * The filter to search for the KeywordAnalysis to update in case it exists.
     */
    where: Prisma.KeywordAnalysisWhereUniqueInput;
    /**
     * In case the KeywordAnalysis found by the `where` argument doesn't exist, create a new KeywordAnalysis with this data.
     */
    create: Prisma.XOR<Prisma.KeywordAnalysisCreateInput, Prisma.KeywordAnalysisUncheckedCreateInput>;
    /**
     * In case the KeywordAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.KeywordAnalysisUpdateInput, Prisma.KeywordAnalysisUncheckedUpdateInput>;
};
/**
 * KeywordAnalysis delete
 */
export type KeywordAnalysisDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
    /**
     * Filter which KeywordAnalysis to delete.
     */
    where: Prisma.KeywordAnalysisWhereUniqueInput;
};
/**
 * KeywordAnalysis deleteMany
 */
export type KeywordAnalysisDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KeywordAnalyses to delete
     */
    where?: Prisma.KeywordAnalysisWhereInput;
    /**
     * Limit how many KeywordAnalyses to delete.
     */
    limit?: number;
};
/**
 * KeywordAnalysis without action
 */
export type KeywordAnalysisDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordAnalysis
     */
    select?: Prisma.KeywordAnalysisSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeywordAnalysis
     */
    omit?: Prisma.KeywordAnalysisOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeywordAnalysisInclude<ExtArgs> | null;
};
//# sourceMappingURL=KeywordAnalysis.d.ts.map