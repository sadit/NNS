var documenterSearchIndex = {"docs":
[{"location":"diststrings/","page":"String alignments","title":"String alignments","text":"\nCurrentModule = SimilaritySearch\nDocTestSetup = quote\n    using SimilaritySearch\nend","category":"page"},{"location":"diststrings/#String-distances","page":"String alignments","title":"String distances","text":"","category":"section"},{"location":"diststrings/","page":"String alignments","title":"String alignments","text":"The following string distances are supported. Please recall that we use the evaluate function definition from Distances.jl.","category":"page"},{"location":"diststrings/","page":"String alignments","title":"String alignments","text":"\nLevenshteinDistance\nLcsDistance\nGenericLevenshteinDistance\nCommonPrefixDissimilarity","category":"page"},{"location":"diststrings/#SimilaritySearch.LevenshteinDistance","page":"String alignments","title":"SimilaritySearch.LevenshteinDistance","text":"LevenshteinDistance(a, b)\n\nInstantiates a GenericLevenshteinDistance object to perform traditional levenshtein distance\n\n\n\n\n\n","category":"function"},{"location":"diststrings/#SimilaritySearch.LcsDistance","page":"String alignments","title":"SimilaritySearch.LcsDistance","text":"LcsDistance(a, b)\n\nInstantiates a GenericLevenshteinDistance object to perform LCS distance\n\n\n\n\n\n","category":"function"},{"location":"diststrings/#SimilaritySearch.GenericLevenshteinDistance","page":"String alignments","title":"SimilaritySearch.GenericLevenshteinDistance","text":"GenericLevenshteinDistance(icost, dcost, rcost)\n\nThe levenshtein distance measures the minimum number of edit operations to convert one string into another. The costs insertion icost, deletion cost dcost, and replace cost rcost.\n\n\n\n\n\n","category":"type"},{"location":"diststrings/#SimilaritySearch.CommonPrefixDissimilarity","page":"String alignments","title":"SimilaritySearch.CommonPrefixDissimilarity","text":"CommonPrefixDissimilarity()\n\nUses the common prefix as a measure of dissimilarity between two strings\n\n\n\n\n\n","category":"type"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"\nCurrentModule = SimilaritySearch\nDocTestSetup = quote\n    using SimilaritySearch\nend","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"SearchGraph creates a graph","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"Tellez, E. S., Ruiz, G., Chavez, E., & Graff, M.A scalable solution to the nearest neighbor search problem through local-search methods on neighbor graphs. Pattern Analysis and Applications, 1-15.","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"As before, we need a dataset X and a distance function.","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"using SimilaritySearch\nX = [randn(3) for i in 1:10_000]\nQ = [randn(3) for i in 1:5]\n\n\nindex = SearchGraph(L2Distance(), X, verbose=true)\n\nfor q in Q\n    println(search(index, q, KnnResult(3)))\nend","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"There are a several options for the construction of the index.","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"\nSearchGraph\nSearchGraphOptions\n","category":"page"},{"location":"searchgraph/#SimilaritySearch.SearchGraph","page":"SearchGraph","title":"SimilaritySearch.SearchGraph","text":"SearchGraph(dist::PreMetric,\n    db::AbstractVector;\n    search_algo::LocalSearchAlgorithm=BeamSearch(),\n    neighborhood_algo::NeighborhoodAlgorithm=LogNeighborhood(),\n    automatic_optimization=false,\n    recall=0.9,\n    ksearch=10,\n    tol=0.001,\n    verbose=true)\n\nCreates a SearchGraph object, i.e., an index to perform approximate search on db using the given search and neighbohood strategies. If automatic_optimization is true, then the structure tries to reach the given recall under the given ksearch.\n\n\n\n\n\n","category":"type"},{"location":"searchgraph/#SimilaritySearch.SearchGraphOptions","page":"SearchGraph","title":"SimilaritySearch.SearchGraphOptions","text":"SearchGraphOptions(automatic_optimization::Bool, recall::Float64, ksearch::Int, tol::Float64, verbose::Bool)\n\nDefines a number of options for the SearchGraph\n\n\n\n\n\n","category":"type"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"Please note ","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"\nBeamSearch\nIHCSearch\n","category":"page"},{"location":"searchgraph/#SimilaritySearch.BeamSearch","page":"SearchGraph","title":"SimilaritySearch.BeamSearch","text":"BeamSearch(bsize::Integer=16, ssize=bsize; hints=Int32[], beam=KnnResult(bsize), vstate=VisitedVertices())\n\nBeamSearch is an iteratively improving local search algorithm that explores the graph using blocks of bsize elements and neighborhoods at the time. Multithreading applications must have copies of this object due to shared cache objects.\n\nssize: The size of the first sampling.\nhints: An initial hint for the exploration (if it is not empty, then superseeds ssize and the initial sampling).\nbeam: A cache object for reducing memory allocations\nvstate: A cache object for reducing memory allocations\n\n\n\n\n\n","category":"type"},{"location":"searchgraph/#SimilaritySearch.IHCSearch","page":"SearchGraph","title":"SimilaritySearch.IHCSearch","text":"IHCSearch(hints::Vector; restarts=length(hints), localimprovements=false)\nIHCSearch(restarts::Integer=20; hints=Int32[], localimprovements=false)\nIHCSearch(hints, restarts, localimprovements, vstate)\n\nIHCSearch is an iterated hill climbing algorithma, a local search algorithm. It greedily navigates the search graph and restart the search restarts times. Multithreading applications must have copies of this object due to shared cache objects.\n\nrestarts: The number of restarts.\nhints: An initial hint for the exploration (if it is not empty, then superseeds the initial points of the random starting points).\nlocalimprovements: An experimental technique that if it is true it will achieve very high quality results, at cost of increasing searching time.\nvstate: A cache object for reducing memory allocations\n\n\n\n\n\n","category":"type"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"Neighborhood algorithms","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"The index can be created incrementally,","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"using SimilaritySearch\n\nindex = SearchGraph(L2Distance(), Vector{Float32}[])\n\nfor i in 1:1000\n    push!(index, rand(Float32, 4))\nend\n\nsearch(index, rand(Float32, 4), 3)","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"The index construction can be customized with find_neighborhood and push_neighborhood","category":"page"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"push!(::SearchGraph, elem)\nfind_neighborhood\npush_neighborhood!\n","category":"page"},{"location":"searchgraph/#Base.push!-Tuple{SearchGraph,Any}","page":"SearchGraph","title":"Base.push!","text":"push!(index::SearchGraph, item)\n\nAppends item into the index.\n\n\n\n\n\n","category":"method"},{"location":"searchgraph/#SimilaritySearch.find_neighborhood","page":"SearchGraph","title":"SimilaritySearch.find_neighborhood","text":"find_neighborhood(algo::FixedNeighborhood, index::SearchGraph, item)\n\nFinds a list of neighbors using the FixedNeighborhood criterion of item in the index\n\n\n\n\n\nfind_neighborhood(index::SearchGraph{T}, item)\n\nSearches for item neighborhood in the index, i.e., if item were in the index whose items should be its neighbors (intenal function)\n\n\n\n\n\n","category":"function"},{"location":"searchgraph/#SimilaritySearch.push_neighborhood!","page":"SearchGraph","title":"SimilaritySearch.push_neighborhood!","text":"push_neighborhood!(index::SearchGraph, item, L::AbstractVector{Int32})\n\nInserts the object item into the index, i.e., creates an edge from items listed in L and the vertex created for ìtem` (internal function)\n\n\n\n\n\n","category":"function"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"optimize!","category":"page"},{"location":"searchgraph/#SimilaritySearch.optimize!","page":"SearchGraph","title":"SimilaritySearch.optimize!","text":"function optimize!(search_algo::LocalSearchAlgorithm,\n                   index::SearchGraph{T},\n                   recall::Float64,\n                   perf::Performance;\n                   bsize::Int=4,\n                   tol::Float64=0.01,\n                   probes::Int=0) where T\n\nOptimizes a local search index for an specific algorithm to get the desired performance. Note that optimizing for low-recall will yield to faster searches; the train queries are specified as part of the perf struct.\n\n\n\n\n\n","category":"function"},{"location":"searchgraph/","page":"SearchGraph","title":"SearchGraph","text":"also see search and push!","category":"page"},{"location":"searching/","page":"Searching","title":"Searching","text":"\nCurrentModule = SimilaritySearch\nDocTestSetup = quote\n    using SimilaritySearch\nend","category":"page"},{"location":"searching/","page":"Searching","title":"Searching","text":"This package focus on solving k-NN queries, that is, retrieving the k nearest neighbors of a given query in a collection of items under a distance function. The distance function is often a metric function.","category":"page"},{"location":"searching/","page":"Searching","title":"Searching","text":"The general procedure is as follows:","category":"page"},{"location":"searching/","page":"Searching","title":"Searching","text":"using SimilaritySearch\nX = [randn(3) for i in 1:10_000]\nQ = [randn(3) for i in 1:5]\n\n\nindex = ExhaustiveSearch(L2Distance(), X)\n\n[search(index, q, KnnResult(3)) for q in Q]\n","category":"page"},{"location":"searching/","page":"Searching","title":"Searching","text":"Given a dataset X, we need to create an index structure; in this example, we created a sequential search index named ExhaustiveSearch. The search is performed by search. This function recieves the index, the query and the specification of the query (i.e., the KnnResult object, which also works as container of the result set).","category":"page"},{"location":"searching/","page":"Searching","title":"Searching","text":"Regarding the distance function, SimilaritySearch.jl defines several distance functions, but also can work with any of the distance functions specified in Distances.jl package.","category":"page"},{"location":"searching/#Other-similarity-search-indexes","page":"Searching","title":"Other similarity search indexes","text":"","category":"section"},{"location":"searching/","page":"Searching","title":"Searching","text":"The ExahustiveSearch index performs an exhaustive evaluation of the query against each element of the dataset, but without any preprocessing cost.","category":"page"},{"location":"searching/","page":"Searching","title":"Searching","text":"In addition of this, the package implements other indexes that can improve the search cost in diverse situations. These indexes have memory and preprocessing time requirements that must be considered in any real application.","category":"page"},{"location":"searching/#Approximate-search","page":"Searching","title":"Approximate search","text":"","category":"section"},{"location":"searching/","page":"Searching","title":"Searching","text":"Performs approximate search; they could solve the query, i.e., the result can lost some items or include some others not being part of the exact solution. In contrast, these indexes are often quite faster and more flexible than exact search methods.","category":"page"},{"location":"searching/","page":"Searching","title":"Searching","text":"SearchGraph: Very fast and precise similarity search index; supports multithreading construction (cite).\nKnr: Indexes based on K nearest references (external package, cite).\nDeloneInvIndex: An index based on a delone partition (external package, cite).","category":"page"},{"location":"searching/#Exact-search","page":"Searching","title":"Exact search","text":"","category":"section"},{"location":"searching/","page":"Searching","title":"Searching","text":"Kvp: K vantage points (cite).\nPivotedSearch: A generic pivot table (cite).\nsss: A pivot table with pivots selected with the SSS scheme (cite).\ndistant_tournament. A pivot table where pivots are selected using a simple distant tournament (cite).","category":"page"},{"location":"distminkowski/","page":"Minkowski","title":"Minkowski","text":"\nCurrentModule = SimilaritySearch\nDocTestSetup = quote\n    using SimilaritySearch\nend","category":"page"},{"location":"distminkowski/#Minkowski-family-of-distance-functions","page":"Minkowski","title":"Minkowski family of distance functions","text":"","category":"section"},{"location":"distminkowski/","page":"Minkowski","title":"Minkowski","text":"The following distinguished members of the Minkowski family of distance functions are provided; please recall that we use the evaluate function definition from Distances.jl.","category":"page"},{"location":"distminkowski/","page":"Minkowski","title":"Minkowski","text":"\nL1Distance\nL2Distance\nSqL2Distance\nLInftyDistance\nLpDistance","category":"page"},{"location":"distminkowski/#SimilaritySearch.L1Distance","page":"Minkowski","title":"SimilaritySearch.L1Distance","text":"L1Distance()\n\nThe manhattan distance or L_1 is defined as\n\nL_1(u v) = sum_iu_i - v_i\n\n\n\n\n\n","category":"type"},{"location":"distminkowski/#SimilaritySearch.L2Distance","page":"Minkowski","title":"SimilaritySearch.L2Distance","text":"L2Distance()\n\nThe euclidean distance or L_2 is defined as\n\nL_2(u v) = sqrtsum_i(u_i - v_i)^2\n\n\n\n\n\n","category":"type"},{"location":"distminkowski/#SimilaritySearch.SqL2Distance","page":"Minkowski","title":"SimilaritySearch.SqL2Distance","text":"SqL2Distance()\n\nThe squared euclidean distance is defined as\n\nL_2(u v) = sum_i(u_i - v_i)^2\n\nIt avoids the computation of the square root and should be used whenever you are able do it.\n\n\n\n\n\n","category":"type"},{"location":"distminkowski/#SimilaritySearch.LInftyDistance","page":"Minkowski","title":"SimilaritySearch.LInftyDistance","text":"LInftyDistance()\n\nThe Chebyshev or L_infty distance is defined as\n\nL_infty(u v) = max_ileft u_i - v_i right\n\n\n\n\n\n","category":"type"},{"location":"distminkowski/#SimilaritySearch.LpDistance","page":"Minkowski","title":"SimilaritySearch.LpDistance","text":"LpDistance(p)\nLpDistance(p, pinv)\n\nThe general Minkowski distance L_p distance is defined as\n\nL_p(u v) = leftsum_i(u_i - v_i)^pright^1p\n\nWhere p_inv = 1p. Note that you can specify unrelated p and pinv if you need an specific behaviour.\n\n\n\n\n\n","category":"type"},{"location":"distcos/","page":"Cosine","title":"Cosine","text":"\nCurrentModule = SimilaritySearch\nDocTestSetup = quote\n    using SimilaritySearch\nend","category":"page"},{"location":"distcos/#Cosine-distance-functions","page":"Cosine","title":"Cosine distance functions","text":"","category":"section"},{"location":"distcos/","page":"Cosine","title":"Cosine","text":"SimilaritySearch implements some cosine/angle distance functions. Please recall that we use the evaluate function definition from Distances.jl.","category":"page"},{"location":"distcos/","page":"Cosine","title":"Cosine","text":"\nCosineDistance\nAngleDistance\nNormalizedCosineDistance\nNormalizedAngleDistance","category":"page"},{"location":"distcos/#SimilaritySearch.CosineDistance","page":"Cosine","title":"SimilaritySearch.CosineDistance","text":"CosineDistance()\n\nThe cosine is defined as:\n\ncos(u v) = fracsum_i u_i v_isqrtsum_i u_i^2 sqrtsum_i v_i^2\n\nThe cosine distance is defined as 1 - cos(uv)\n\n\n\n\n\n","category":"type"},{"location":"distcos/#SimilaritySearch.AngleDistance","page":"Cosine","title":"SimilaritySearch.AngleDistance","text":"AngleDistance()\n\nThe angle distance is defined as:\n\n(u v)= arccos(cos(u v))\n\n\n\n\n\n","category":"type"},{"location":"distcos/#SimilaritySearch.NormalizedCosineDistance","page":"Cosine","title":"SimilaritySearch.NormalizedCosineDistance","text":"NormalizedCosineDistance()\n\nSimilar to CosineDistance but suppose that input vectors are already normalized\n\n1 - sum_i u_i v_i\n\n\n\n\n\n","category":"type"},{"location":"distcos/#SimilaritySearch.NormalizedAngleDistance","page":"Cosine","title":"SimilaritySearch.NormalizedAngleDistance","text":"NormalizedAngleDistance()\n\nSimilar to AngleDistance but suppose that input vectors are already normalized\n\narccos sum_i u_i v_i\n\n\n\n\n\n","category":"type"},{"location":"disthamming/","page":"Hamming","title":"Hamming","text":"\nCurrentModule = SimilaritySearch\nDocTestSetup = quote\n    using SimilaritySearch\nend","category":"page"},{"location":"disthamming/#Hamming-distance-functions","page":"Hamming","title":"Hamming distance functions","text":"","category":"section"},{"location":"disthamming/","page":"Hamming","title":"Hamming","text":"The hamming distance for binary and string data is implemented. Please recall that we use the evaluate function definition from Distances.jl.","category":"page"},{"location":"disthamming/","page":"Hamming","title":"Hamming","text":"\nBinaryHammingDistance\nStringHammingDistance","category":"page"},{"location":"disthamming/#SimilaritySearch.BinaryHammingDistance","page":"Hamming","title":"SimilaritySearch.BinaryHammingDistance","text":"BinaryHammingDistance()\n\nBinary hamming uses bit wise operations to count the differences between bit strings\n\n\n\n\n\n","category":"type"},{"location":"disthamming/#SimilaritySearch.StringHammingDistance","page":"Hamming","title":"SimilaritySearch.StringHammingDistance","text":"StringHammingDistance()\n\nThe hamming distance counts the differences between two equally sized strings\n\n\n\n\n\n","category":"type"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = SimilaritySearch","category":"page"},{"location":"#SimilaritySearch.jl","page":"Home","title":"SimilaritySearch.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SimilaritySearch.jl is a library for nearest neighbor search. In particular, it contains the implementation for SearchGraph:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Tellez, E. S., Ruiz, G., Chavez, E., & Graff, M.A scalable solution to the nearest neighbor search problem through local-search methods on neighbor graphs. Pattern Analysis and Applications, 1-15.","category":"page"},{"location":"","page":"Home","title":"Home","text":"@article{tellezscalable,\n  title={A scalable solution to the nearest neighbor search problem through local-search methods on neighbor graphs},\n  author={Tellez, Eric S and Ruiz, Guillermo and Chavez, Edgar and Graff, Mario},\n  journal={Pattern Analysis and Applications},\n  pages={1--15},\n  publisher={Springer}\n}","category":"page"},{"location":"#Installing-SimilaritySearch","page":"Home","title":"Installing SimilaritySearch","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You may install the package as follows","category":"page"},{"location":"","page":"Home","title":"Home","text":"] add SimilaritySearch","category":"page"},{"location":"","page":"Home","title":"Home","text":"also, you can run the set of tests as fol","category":"page"},{"location":"","page":"Home","title":"Home","text":"] test SimilaritySearch","category":"page"},{"location":"#Using-the-library","page":"Home","title":"Using the library","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Please see examples directory of this repository. Here you will find a list of Pluto's notebooks that exemplifies its usage.","category":"page"},{"location":"distsets/","page":"Sets","title":"Sets","text":"\nCurrentModule = SimilaritySearch\nDocTestSetup = quote\n    using SimilaritySearch\nend","category":"page"},{"location":"distsets/#Set-distances","page":"Sets","title":"Set distances","text":"","category":"section"},{"location":"distsets/","page":"Sets","title":"Sets","text":"The following set distances are supported. Please recall that we use the evaluate function definition from Distances.jl.","category":"page"},{"location":"distsets/","page":"Sets","title":"Sets","text":"\nJaccardDistance\nDiceDistance\nIntersectionDissimilarity","category":"page"},{"location":"distsets/#SimilaritySearch.JaccardDistance","page":"Sets","title":"SimilaritySearch.JaccardDistance","text":"JaccardDistance()\n\nThe Jaccard distance is defined as\n\nJ(u v) = fracu cap vu cup v\n\n\n\n\n\n","category":"type"},{"location":"distsets/#SimilaritySearch.DiceDistance","page":"Sets","title":"SimilaritySearch.DiceDistance","text":"DiceDistance()\n\nThe Dice distance is defined as\n\nD(u v) = frac2 u cap vu + v\n\n\n\n\n\n","category":"type"},{"location":"distsets/#SimilaritySearch.IntersectionDissimilarity","page":"Sets","title":"SimilaritySearch.IntersectionDissimilarity","text":"IntersectionDissimilarity()\n\nThe intersection dissimilarity uses the size of the intersection as a mesuare of similarity as follows:\n\nI(u v) = 1 - fracu cap vmax u v\n\n\n\n\n\n","category":"type"},{"location":"knnresult/","page":"Knn results","title":"Knn results","text":"\nCurrentModule = SimilaritySearch\nDocTestSetup = quote\n    using SimilaritySearch\nend","category":"page"},{"location":"knnresult/#KnnResult","page":"Knn results","title":"KnnResult","text":"","category":"section"},{"location":"knnresult/","page":"Knn results","title":"Knn results","text":"SimilaritySearch's core is to solve knn searches; for this matter, it relies on the KnnResult struct and its related functions.","category":"page"},{"location":"knnresult/","page":"Knn results","title":"Knn results","text":"\nItem\nKnnResult\nmaxlength\ncovrad\nmaxlength\npush!(res::KnnResult, id::Integer, dist::AbstractFloat)","category":"page"},{"location":"knnresult/#SimilaritySearch.Item","page":"Knn results","title":"SimilaritySearch.Item","text":"Item(id, dist)\n\nAn item identifier and its related distance to another item\n\n\n\n\n\n","category":"type"},{"location":"knnresult/#SimilaritySearch.KnnResult","page":"Knn results","title":"SimilaritySearch.KnnResult","text":"KnnResult(ksearch::Integer)\nKnnResult(arrOfItems::AbstractVector)\nKnnResult(currsize, capacity, pool)  # low level constructor\n\nCreates a priority queue with fixed capacity (ksearch) representing a knn result set. It starts with zero items and grows with push!(res, id, dist) calls until ksearch size is reached. After this only the smallest items based on distance are preserved.\n\n\n\n\n\n","category":"type"},{"location":"knnresult/#SimilaritySearch.maxlength","page":"Knn results","title":"SimilaritySearch.maxlength","text":"maxlength(res::KnnResult)\n\nThe maximum allowed cardinality (the k of knn)\n\n\n\n\n\n","category":"function"},{"location":"knnresult/#SimilaritySearch.covrad","page":"Knn results","title":"SimilaritySearch.covrad","text":"covrad(p::KnnResult)\n\nReturns the coverage radius of the result set; if length(p) < K then typemax(Float32) is returned\n\n\n\n\n\n","category":"function"}]
}
